const db = require("../config/db");

const AttendanceModel = {
  getAll: (callback) => {
    const sql = `
            SELECT
                a.id,
                a.employee_id,
                e.nik,
                p.fullname,

                a.attendance_date,
                a.check_in,
                a.check_out,
                a.attendance_type,
                a.attendance_status,
                a.late_minutes,
                a.work_hours,
                a.notes,
                a.is_active,
                a.created_at,
                a.updated_at

            FROM attendances a

            JOIN employees e
                ON a.employee_id = e.id

            JOIN personals p
                ON e.id = p.id

            ORDER BY a.attendance_date DESC
        `;

    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
            SELECT
                a.id,
                a.employee_id,
                e.nik,
                p.fullname,

                a.attendance_date,
                a.check_in,
                a.check_out,
                a.attendance_type,
                a.attendance_status,
                a.late_minutes,
                a.work_hours,
                a.notes,
                a.is_active,
                a.created_at,
                a.updated_at

            FROM attendances a

            JOIN employees e
                ON a.employee_id = e.id

            JOIN personals p
                ON e.personal_id = p.id

            WHERE a.id = ?
        `;

    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `
            INSERT INTO attendances (
                employee_id,
                attendance_date,
                check_in,
                check_out,
                attendance_type,
                attendance_status,
                late_minutes,
                work_hours,
                notes,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query(
      sql,
      [
        data.employee_id,
        data.attendance_date,
        data.check_in,
        data.check_out,
        data.attendance_type,
        data.attendance_status,
        data.late_minutes,
        data.work_hours,
        data.notes,
        data.created_by,
      ],
      callback,
    );
  },

  update: (id, data, callback) => {
    const sql = `
            UPDATE attendances
            SET
                employee_id = ?,
                attendance_date = ?,
                check_in = ?,
                check_out = ?,
                attendance_type = ?,
                attendance_status = ?,
                late_minutes = ?,
                work_hours = ?,
                notes = ?,
                updated_by = ?,
                is_active = ?
            WHERE id = ?
        `;

    db.query(
      sql,
      [
        data.employee_id,
        data.attendance_date,
        data.check_in,
        data.check_out,
        data.attendance_type,
        data.attendance_status,
        data.late_minutes,
        data.work_hours,
        data.notes,
        data.updated_by,
        data.is_active,
        id,
      ],
      callback,
    );
  },

  delete: (id, callback) => {
    const sql = `
            DELETE FROM attendances
            WHERE id = ?
        `;

    db.query(sql, [id], callback);
  },
};

module.exports = AttendanceModel;
