import db from '../database/init.js';

export class Attendance {
  static async create(attendanceData) {
    const { studentId, date, timeIn, timeOut, status, location, notes } = attendanceData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO attendance (studentId, date, timeIn, timeOut, status, location, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [studentId, date, timeIn, timeOut, status, location, notes],
        function(err) {
          if (err) reject(err);
          else {
            Attendance.findById(this.lastID).then(resolve).catch(reject);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT a.*, s.firstName, s.lastName, s.email, s.course, s.year, s.section
         FROM attendance a
         LEFT JOIN students s ON a.studentId = s.studentId
         WHERE a.id = ?`,
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async findByStudentAndDate(studentId, date) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM attendance WHERE studentId = ? AND date = ?',
        [studentId, date],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static async findAll(params = {}) {
    const { page = 1, limit = 10, date, studentId, status } = params;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT a.*, s.firstName, s.lastName, s.email, s.course, s.year, s.section
      FROM attendance a
      LEFT JOIN students s ON a.studentId = s.studentId
      WHERE 1=1
    `;
    let countQuery = 'SELECT COUNT(*) as total FROM attendance a WHERE 1=1';
    const queryParams = [];
    
    if (date) {
      query += ' AND a.date = ?';
      countQuery += ' AND a.date = ?';
      queryParams.push(date);
    }
    
    if (studentId) {
      query += ' AND a.studentId = ?';
      countQuery += ' AND a.studentId = ?';
      queryParams.push(studentId);
    }
    
    if (status) {
      query += ' AND a.status = ?';
      countQuery += ' AND a.status = ?';
      queryParams.push(status);
    }
    
    query += ' ORDER BY a.timeIn DESC LIMIT ? OFFSET ?';
    
    return new Promise((resolve, reject) => {
      // Get total count
      db.get(countQuery, queryParams, (err, countRow) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Get paginated results
        db.all(query, [...queryParams, limit, offset], (err, rows) => {
          if (err) reject(err);
          else {
            resolve({
              attendance: rows,
              total: countRow.total,
              page: parseInt(page),
              pages: Math.ceil(countRow.total / limit)
            });
          }
        });
      });
    });
  }

  static async update(id, updateData) {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE attendance SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [...values, id],
        function(err) {
          if (err) reject(err);
          else {
            Attendance.findById(id).then(resolve).catch(reject);
          }
        }
      );
    });
  }

  static async getAttendanceByDate(date) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, s.firstName, s.lastName, s.email, s.course, s.year, s.section
         FROM attendance a
         LEFT JOIN students s ON a.studentId = s.studentId
         WHERE a.date = ?
         ORDER BY a.timeIn DESC`,
        [date],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static async getAttendanceSummary(date) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
           COUNT(*) as total,
           SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
           SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late
         FROM attendance 
         WHERE date = ?`,
        [date],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows[0] || { total: 0, present: 0, late: 0 });
        }
      );
    });
  }

  static async getRecentAttendance(limit = 10) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, s.firstName, s.lastName, s.course
         FROM attendance a
         LEFT JOIN students s ON a.studentId = s.studentId
         WHERE a.date = date('now')
         ORDER BY a.timeIn DESC
         LIMIT ?`,
        [limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static async getAttendanceTrend(days = 7) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
           date,
           COUNT(*) as count
         FROM attendance 
         WHERE date >= date('now', '-${days} days')
         GROUP BY date
         ORDER BY date`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}