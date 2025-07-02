import express from 'express';
import QRCode from 'qrcode';
import { body, validationResult } from 'express-validator';
import { Student } from '../models/Student.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Generate unique student ID
const generateStudentId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `STU${timestamp}${randomStr}`.toUpperCase();
};

// Register new student
router.post('/register', [
  body('firstName').notEmpty().trim().escape(),
  body('lastName').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phoneNumber').notEmpty().trim(),
  body('course').notEmpty().trim().escape(),
  body('year').isInt({ min: 1, max: 4 }),
  body('section').notEmpty().trim().escape()
], async (req, res) => {
  try {
    console.log('Registration request received:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phoneNumber, course, year, section, workshopData } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findByEmail(email);
    if (existingStudent) {
      console.log('Student already exists with email:', email);
      return res.status(400).json({ error: 'Student with this email already exists' });
    }

    // Generate unique student ID
    let studentId;
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 10) {
      studentId = generateStudentId();
      const existing = await Student.findByStudentId(studentId);
      if (!existing) isUnique = true;
      attempts++;
    }

    if (!isUnique) {
      console.log('Failed to generate unique student ID after 10 attempts');
      return res.status(500).json({ error: 'Failed to generate unique student ID' });
    }

    console.log('Generated student ID:', studentId);

    // Generate QR code
    const qrData = JSON.stringify({
      studentId,
      firstName,
      lastName,
      email
    });

    console.log('Generating QR code with data:', qrData);

    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    console.log('QR code generated successfully');

    // Create student
    const student = await Student.create({
      studentId,
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      year,
      section,
      qrCode: qrCodeDataURL,
      workshopData
    });

    console.log('Student created successfully:', student);

    res.status(201).json({
      message: 'Student registered successfully',
      student: {
        id: student.id,
        studentId: student.studentId,
        fullName: `${student.firstName} ${student.lastName}`,
        email: student.email,
        course: student.course,
        year: student.year,
        section: student.section,
        qrCode: student.qrCode
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.message 
    });
  }
});

// Get all students (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', course = '', year = '' } = req.query;
    
    const result = await Student.findAll({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      course,
      year
    });

    res.json(result);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get student by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Update student
router.put('/:id', auth, [
  body('firstName').optional().notEmpty().trim().escape(),
  body('lastName').optional().notEmpty().trim().escape(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phoneNumber').optional().notEmpty().trim(),
  body('course').optional().notEmpty().trim().escape(),
  body('year').optional().isInt({ min: 1, max: 4 }),
  body('section').optional().notEmpty().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await Student.update(req.params.id, req.body);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete student (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Student.delete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Get student QR code
router.get('/:id/qr', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
      qrCode: student.qrCode,
      studentInfo: {
        fullName: `${student.firstName} ${student.lastName}`,
        studentId: student.studentId
      }
    });
  } catch (error) {
    console.error('Get QR code error:', error);
    res.status(500).json({ error: 'Failed to fetch QR code' });
  }
});

export default router;