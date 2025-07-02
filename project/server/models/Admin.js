import db from '../database/init.js';
import bcrypt from 'bcryptjs';

export class Admin {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM admins WHERE email = ? AND isActive = 1',
        [email],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM admins WHERE id = ? AND isActive = 1',
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async create(adminData) {
    const { email, password, firstName, lastName, role = 'admin' } = adminData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO admins (email, password, firstName, lastName, role)
         VALUES (?, ?, ?, ?, ?)`,
        [email, hashedPassword, firstName, lastName, role],
        function(err) {
          if (err) reject(err);
          else {
            Admin.findById(this.lastID).then(resolve).catch(reject);
          }
        }
      );
    });
  }

  static async updateLastLogin(id) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE admins SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?',
        [id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async count() {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM admins', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    });
  }
}