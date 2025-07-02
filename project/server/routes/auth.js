import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { Admin } from '../models/Admin.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Login admin
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await Admin.comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await Admin.updateLastLogin(admin.id);

    const token = generateToken(admin.id);

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: `${admin.firstName} ${admin.lastName}`,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Create initial admin (for setup)
router.post('/setup', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim()
], async (req, res) => {
  try {
    // Check if any admin exists
    const adminCount = await Admin.count();
    if (adminCount > 0) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;

    const admin = await Admin.create({
      email,
      password,
      firstName,
      lastName,
      role: 'super-admin'
    });

    const token = generateToken(admin.id);

    res.status(201).json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        fullName: `${admin.firstName} ${admin.lastName}`,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin setup error:', error);
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

export default router;