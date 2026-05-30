const db = require("../config/db");

const EmployeeModel = {
  getAll: (callback) => {
    const sql = `
            SELECT
                e.id,
                e.nik,
                
                p.fullname,
                p.birthdate,
                p.birthplace,
                p.gender,
                p.nik_ktp,

                e.company_id,
                c.company_name,

                e.departement_id,
                d.departement_name,

                e.level_id,
                l.level_name,

                e.position_id,
                po.position_name,

                e.section_id,
                s.section_name,

                e.is_active,
                e.start_date,
                e.end_date,
                e.path_photo

            FROM employees e

            JOIN personals p
                ON e.id = p.id

            JOIN companies c
                ON e.company_id = c.id

            JOIN departements d
                ON e.departement_id = d.id

            JOIN levels l
                ON e.level_id = l.id

            JOIN positions po
                ON e.position_id = po.id

            JOIN sections s
                ON e.section_id = s.id

            ORDER BY e.id DESC
        `;

    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = `
            SELECT
                e.id,
                e.nik,

                p.fullname,
                p.birthdate,
                p.birthplace,
                p.gender,
                p.nik_ktp,

                e.company_id,
                c.company_name,

                e.departement_id,
                d.departement_name,

                e.level_id,
                l.level_name,

                e.position_id,
                po.position_name,

                e.section_id,
                s.section_name,

                e.is_active,
                e.start_date,
                e.end_date,
                e.path_photo

            FROM employees e

            JOIN personals p
                ON e.id = p.id

            JOIN companies c
                ON e.company_id = c.id

            JOIN departements d
                ON e.departement_id = d.id

            JOIN levels l
                ON e.level_id = l.id

            JOIN positions po
                ON e.position_id = po.id

            JOIN sections s
                ON e.section_id = s.id

            WHERE e.id = ?
        `;

    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `
            INSERT INTO employees (
                nik,
                company_id,
                departement_id,
                level_id,
                position_id,
                section_id,
                start_date,
                end_date,
                path_photo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query(
      sql,
      [
        data.nik,
        data.company_id,
        data.departement_id,
        data.level_id,
        data.position_id,
        data.section_id,
        data.start_date,
        data.end_date,
        data.path_photo,
      ],
      callback,
    );
  },

  update: (id, data, callback) => {
    const sql = `
            UPDATE employees
            SET
                nik = ?,
                company_id = ?,
                departement_id = ?,
                level_id = ?,
                position_id = ?,
                section_id = ?,
                is_active = ?,
                start_date = ?,
                end_date = ?,
                path_photo = ?
            WHERE id = ?
        `;

    db.query(
      sql,
      [
        data.nik,
        data.company_id,
        data.departement_id,
        data.level_id,
        data.position_id,
        data.section_id,
        data.is_active,
        data.start_date,
        data.end_date,
        data.path_photo,
        id,
      ],
      callback,
    );
  },

  delete: (id, callback) => {
    const sql = `
            DELETE FROM employees
            WHERE id = ?
        `;

    db.query(sql, [id], callback);
  },
};

module.exports = EmployeeModel;
