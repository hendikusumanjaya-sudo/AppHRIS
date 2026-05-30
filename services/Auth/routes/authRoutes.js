const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password, personal_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
            INSERT INTO users (username, password, personal_id)
            VALUES (?, ?, ?)
        `;

    db.query(sql, [username, hashedPassword, personal_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered",
        id: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `
        SELECT *
        FROM users
        WHERE username = ?
        AND is_active = 1
    `;

  db.query(sql, [username], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(401).json({
        message: "Username not found",
      });
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    // GET USER ROLES
    const roleSql = `
            SELECT
                r.id,
                r.role_name
            FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = ?
            AND ur.is_active = 1
            AND r.is_active = 1
        `;

    db.query(roleSql, [user.id], (roleErr, roleResult) => {
      if (roleErr) {
        return res.status(500).json(roleErr);
      }

      const roles = roleResult.map((role) => ({
        id: role.id,
        role_name: role.role_name,
      }));

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          roles: roles,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.json({
        message: "Login success",
        token,
        user: {
          id: user.id,
          username: user.username,
          roles: roles,
        },
      });
    });
  });
});

// // LOGIN
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const sql = `
//         SELECT *
//         FROM users
//         WHERE username = ?
//         AND is_active = 1
//     `;

//   db.query(sql, [username], async (err, result) => {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     if (result.length === 0) {
//       return res.status(401).json({
//         message: "Username not found",
//       });
//     }

//     const user = result[0];

//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) {
//       return res.status(401).json({
//         message: "Wrong password",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         username: user.username,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       },
//     );

//     res.json({
//       message: "Login success",
//       token,
//       user: {
//         id: user.id,
//         username: user.username,
//         role_id: user.role_id,
//         rolename: user.rolename,
//       },
//     });
//   });
// });

module.exports = router;
