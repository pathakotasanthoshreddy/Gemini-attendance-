import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database connection
const dbPath = path.join(__dirname, 'attendance.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        // Create admins table
        db.run(`
          CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            role TEXT DEFAULT 'admin',
            isActive INTEGER DEFAULT 1,
            lastLogin DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create students table
        db.run(`
          CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            studentId TEXT UNIQUE NOT NULL,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phoneNumber TEXT NOT NULL,
            course TEXT NOT NULL,
            year INTEGER NOT NULL,
            section TEXT NOT NULL,
            qrCode TEXT NOT NULL,
            workshopData TEXT,
            isActive INTEGER DEFAULT 1,
            registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Create attendance table
        db.run(`
          CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            studentId TEXT NOT NULL,
            date DATE NOT NULL,
            timeIn DATETIME NOT NULL,
            timeOut DATETIME,
            status TEXT DEFAULT 'present',
            location TEXT DEFAULT 'Main Campus',
            notes TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (studentId) REFERENCES students (studentId)
          )
        `);

        // Create default admin if not exists
        const hashedPassword = await bcrypt.hash('Vcube$4321', 12);
        
        db.run(`
          INSERT OR IGNORE INTO admins (email, password, firstName, lastName, role)
          VALUES (?, ?, ?, ?, ?)
        `, ['vcubemulticloud@gmail.com', hashedPassword, 'VCube', 'Admin', 'super-admin']);

        console.log('✅ Database initialized successfully');
        resolve();
      } catch (error) {
        console.error('❌ Database initialization error:', error);
        reject(error);
      }
    });
  });
};

export default db;