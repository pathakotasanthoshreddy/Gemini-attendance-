// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './database/init.js';
import geoip from 'geoip-lite'; // ✅ GeoIP import

// Routes
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import attendanceRoutes from './routes/attendance.js';
import adminRoutes from './routes/admin.js';

// ES6 module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS config
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Allow all in dev
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ India-only IP access middleware (only in production)
app.use((req, res, next) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const cleanedIp = ip.includes(':') ? ip.split(':').pop() : ip;
  const geo = geoip.lookup(cleanedIp);
  const country = geo?.country;

  console.log(`🌍 IP: ${cleanedIp}, Country: ${country || 'Unknown'}`);

  if (isDev || country === 'IN') {
    next();
  } else {
    res.status(403).json({
      message: 'Access denied. This API is restricted to India only.',
      ip: cleanedIp,
      country: country || 'Unknown',
      timestamp: new Date().toISOString()
    });
  }
});

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n🌐 ${timestamp} - ${req.method} ${req.path}`);
  console.log(`📍 Origin: ${req.get('Origin') || 'No origin'}`);
  console.log(`🔗 User-Agent: ${req.get('User-Agent') || 'No user agent'}`);

  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
  }

  if (Object.keys(req.query).length > 0) {
    console.log('🔍 Query params:', req.query);
  }

  const originalSend = res.send;
  res.send = function (data) {
    console.log(`📤 Response status: ${res.statusCode}`);
    if (res.statusCode >= 400) {
      console.log(`❌ Error response: ${data}`);
    }
    originalSend.call(this, data);
  };

  next();
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('💓 Health check requested');
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'VCube QR Attendance System API is running'
  });
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('🧪 Test endpoint called');
  res.json({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('❓ 404 - Route not found:', req.originalUrl);
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Start server after DB init
initDatabase()
  .then(() => {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('\n🎉 ================================');
      console.log('🚀 VCube QR Attendance System API');
      console.log('🎉 ================================');
      console.log(`📱 Server running on port ${PORT}`);
      console.log(`🔗 Local API URL: http://localhost:${PORT}`);
      console.log(`🌐 Network API URL: http://0.0.0.0:${PORT}`);
      console.log(`💾 Using local SQLite database`);
      console.log(`👤 Admin credentials: vcubemulticloud@gmail.com / Vcube$4321`);
      console.log(`💓 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
      console.log('🎉 ================================\n');
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.error('🔧 Stop other processes or change the port in `.env`');
      } else {
        console.error('❌ Server error:', err);
      }
      process.exit(1);
    });

    process.on('SIGTERM', () => {
      console.log('🚩 SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\n🚩 SIGINT received, shutting down gracefully');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
  })
  .catch(err => {
    console.error('❌ Failed to initialize database:', err);
    process.exit(1);
  });
