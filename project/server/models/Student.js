import db from '../database/init.js';

export class Student {
  static async create(studentData) {
    const {
      studentId, firstName, lastName, email, phoneNumber,
      course, year, section, qrCode, workshopData
    } = studentData;

    return new Promise((resolve, reject) => {
      console.log('Creating student with data:', studentData);
      
      db.run(
        `INSERT INTO students (studentId, firstName, lastName, email, phoneNumber, course, year, section, qrCode, workshopData)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [studentId, firstName, lastName, email, phoneNumber, course, year, section, qrCode, JSON.stringify(workshopData || {})],
        function(err) {
          if (err) {
            console.error('Database error creating student:', err);
            reject(err);
          } else {
            console.log('Student created with ID:', this.lastID);
            Student.findById(this.lastID).then(resolve).catch(reject);
          }
        }
      );
    });
  }

  static async findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM students WHERE id = ? AND isActive = 1',
        [id],
        (err, row) => {
          if (err) {
            console.error('Database error finding student by ID:', err);
            reject(err);
          } else {
            if (row && row.workshopData) {
              try {
                row.workshopData = JSON.parse(row.workshopData);
              } catch (e) {
                console.error('Error parsing workshopData:', e);
                row.workshopData = {};
              }
            }
            resolve(row);
          }
        }
      );
    });
  }

  static async findByStudentId(studentId) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM students WHERE studentId = ? AND isActive = 1',
        [studentId],
        (err, row) => {
          if (err) {
            console.error('Database error finding student by studentId:', err);
            reject(err);
          } else {
            if (row && row.workshopData) {
              try {
                row.workshopData = JSON.parse(row.workshopData);
              } catch (e) {
                console.error('Error parsing workshopData:', e);
                row.workshopData = {};
              }
            }
            resolve(row);
          }
        }
      );
    });
  }

  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM students WHERE email = ? AND isActive = 1',
        [email],
        (err, row) => {
          if (err) {
            console.error('Database error finding student by email:', err);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  }

  static async findAll(params = {}) {
    const { page = 1, limit = 10, search = '', course = '', year = '' } = params;
    const offset = (page - 1) * limit;
    
    let query = 'SELECT * FROM students WHERE isActive = 1';
    let countQuery = 'SELECT COUNT(*) as total FROM students WHERE isActive = 1';
    const queryParams = [];
    
    if (search) {
      query += ' AND (firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR studentId LIKE ?)';
      countQuery += ' AND (firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR studentId LIKE ?)';
      const searchParam = `%${search}%`;
      queryParams.push(searchParam, searchParam, searchParam, searchParam);
    }
    
    if (course) {
      query += ' AND course = ?';
      countQuery += ' AND course = ?';
      queryParams.push(course);
    }
    
    if (year) {
      query += ' AND year = ?';
      countQuery += ' AND year = ?';
      queryParams.push(parseInt(year));
    }
    
    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    
    return new Promise((resolve, reject) => {
      // Get total count
      db.get(countQuery, queryParams, (err, countRow) => {
        if (err) {
          console.error('Database error getting count:', err);
          reject(err);
          return;
        }
        
        // Get paginated results
        db.all(query, [...queryParams, limit, offset], (err, rows) => {
          if (err) {
            console.error('Database error getting students:', err);
            reject(err);
          } else {
            const students = rows.map(row => {
              if (row.workshopData) {
                try {
                  row.workshopData = JSON.parse(row.workshopData);
                } catch (e) {
                  console.error('Error parsing workshopData:', e);
                  row.workshopData = {};
                }
              }
              return row;
            });
            
            resolve({
              students,
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
        `UPDATE students SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
        [...values, id],
        function(err) {
          if (err) {
            console.error('Database error updating student:', err);
            reject(err);
          } else {
            Student.findById(id).then(resolve).catch(reject);
          }
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE students SET isActive = 0, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [id],
        (err) => {
          if (err) {
            console.error('Database error deleting student:', err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async count() {
    return new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM students WHERE isActive = 1', (err, row) => {
        if (err) {
          console.error('Database error counting students:', err);
          reject(err);
        } else {
          resolve(row.count);
        }
      });
    });
  }
}