import express from 'express';
import { body, validationResult } from 'express-validator';
import { Attendance } from '../models/Attendance.js';
import { Student } from '../models/Student.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Mark attendance via QR code scan
router.post('/mark', [
  body('studentId').notEmpty().trim(),
  body('location').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { studentId, location = 'Main Campus' } = req.body;

    // Verify student exists
    const student = await Student.findByStudentId(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if already marked today
    const today = new Date().toISOString().split('T')[0];
    
    const existingAttendance = await Attendance.findByStudentAndDate(studentId, today);

    if (existingAttendance) {
      // Update time out if checking out
      if (!existingAttendance.timeOut) {
        const updatedAttendance = await Attendance.update(existingAttendance.id, {
          timeOut: new Date().toISOString()
        });
        
        return res.json({
          message: 'Check-out successful',
          attendance: updatedAttendance,
          student: {
            fullName: `${student.firstName} ${student.lastName}`,
            studentId: student.studentId,
            course: student.course
          }
        });
      } else {
        return res.status(400).json({ error: 'Attendance already marked for today' });
      }
    }

    // Determine status based on time
    const currentTime = new Date();
    const cutoffTime = new Date();
    cutoffTime.setHours(9, 0, 0, 0); // 9:00 AM cutoff
    
    const status = currentTime > cutoffTime ? 'late' : 'present';

    // Create attendance record
    const attendance = await Attendance.create({
      studentId,
      date: today,
      timeIn: currentTime.toISOString(),
      status,
      location
    });

    res.status(201).json({
      message: 'Attendance marked successfully',
      attendance,
      student: {
        fullName: `${student.firstName} ${student.lastName}`,
        studentId: student.studentId,
        course: student.course
      }
    });
  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// Get attendance records (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      date = new Date().toISOString().split('T')[0],
      studentId = '',
      status = ''
    } = req.query;

    const params = {
      page: parseInt(page),
      limit: parseInt(limit),
      date,
      studentId,
      status
    };

    const result = await Attendance.findAll(params);
    res.json(result);
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Get attendance summary
router.get('/summary', auth, async (req, res) => {
  try {
    const { date = new Date().toISOString().split('T')[0] } = req.query;
    
    const summary = await Attendance.getAttendanceSummary(date);
    const totalStudents = await Student.count();
    
    const absentCount = totalStudents - summary.total;
    const attendanceRate = totalStudents > 0 ? ((summary.total / totalStudents) * 100).toFixed(2) : 0;

    res.json({
      date,
      totalStudents,
      present: summary.present || 0,
      late: summary.late || 0,
      absent: absentCount,
      attendanceRate
    });
  } catch (error) {
    console.error('Get attendance summary error:', error);
    res.status(500).json({ error: 'Failed to fetch attendance summary' });
  }
});

export default router;