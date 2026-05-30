const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");

// GET USER ROLES
router.get("/", verifyToken, (req, res) => {
  const sql = `
        SELECT
            ur.id,
            u.username,
            r.role_name,
            ur.is_active
        FROM user_roles ur
        JOIN users u ON ur.user_id = u.id
        JOIN roles r ON ur.role_id = r.id
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// CREATE USER ROLE
router.post("/", verifyToken, (req, res) => {
  const { user_id, role_id } = req.body;

  const sql = `
        INSERT INTO user_roles (user_id, role_id)
        VALUES (?, ?)
    `;

  db.query(sql, [user_id, role_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "User role created",
      id: result.insertId,
    });
  });
});

// UPDATE USER ROLE
router.put("/:id", verifyToken, (req, res) => {
  const { user_id, role_id, is_active } = req.body;

  const sql = `
        UPDATE user_roles
        SET user_id = ?,
            role_id = ?,
            is_active = ?
        WHERE id = ?
    `;

  db.query(sql, [user_id, role_id, is_active, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "User role updated",
    });
  });
});

// DELETE USER ROLE
router.delete("/:id", verifyToken, (req, res) => {
  const sql = `
        DELETE FROM user_roles
        WHERE id = ?
    `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "User role deleted",
    });
  });
});

module.exports = router;
