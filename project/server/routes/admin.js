import express from 'express';
import createCsvWriter from 'csv-writer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Student } from '../models/Student.js';
import { Attendance } from '../models/Attendance.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export students to CSV
router.get('/export/students', auth, async (req, res) => {
  try {
    const result = await Student.findAll({ limit: 1000 }); // Get all students
    const students = result.students;
    
    const csvWriter = createCsvWriter.createObjectCsvWriter({
      path: path.join(__dirname, '../exports/students.csv'),
      header: [
        { id: 'studentId', title: 'Student ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'email', title: 'Email' },
        { id: 'phoneNumber', title: 'Phone Number' },
        { id: 'course', title: 'Course' },
        { id: 'year', title: 'Year' },
        { id: 'section', title: 'Section' },
        { id: 'registrationDate', title: 'Registration Date' }
      ]
    });

    // Ensure exports directory exists
    const exportsDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    await csvWriter.writeRecords(students);
    
    const filePath = path.join(__dirname, '../exports/students.csv');
    res.download(filePath, 'students.csv', (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Clean up the file after download
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('File cleanup error:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('Export students error:', error);
    res.status(500).json({ error: 'Failed to export students' });
  }
});

// Dashboard statistics
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalStudents = await Student.count();
    
    const today = new Date().toISOString().split('T')[0];
    const summary = await Attendance.getAttendanceSummary(today);
    
    const todayAttendance = summary.total || 0;
    const presentToday = summary.present || 0;
    const lateToday = summary.late || 0;

    // Get recent attendance
    const recentAttendance = await Attendance.getRecentAttendance(10);

    // Get attendance trend for the past 7 days
    const attendanceTrend = await Attendance.getAttendanceTrend(7);

    res.json({
      totalStudents,
      todayAttendance,
      presentToday,
      lateToday,
      absentToday: totalStudents - todayAttendance,
      attendanceRate: totalStudents > 0 ? ((todayAttendance / totalStudents) * 100).toFixed(2) : 0,
      recentAttendance,
      attendanceTrend
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;
