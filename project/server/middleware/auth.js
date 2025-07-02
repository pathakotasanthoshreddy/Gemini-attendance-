import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const admin = await Admin.findById(decoded.userId);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Access denied. Invalid token.' });
  }
};

export default auth;