const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// GET ALL USERS
router.get("/", verifyToken, (req, res) => {
  const sql = `
        SELECT id, username, personal_id, is_active, created_at
        FROM users
    `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// GET USER BY ID
router.get("/:id", verifyToken, (req, res) => {
  const sql = `
        SELECT id, username, personal_id, is_active
        FROM users
        WHERE id = ?
    `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});

// CREATE USER
router.post("/", verifyToken, async (req, res) => {
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
      message: "User created",
      id: result.insertId,
    });
  });
});

// CREATE USER
router.post("/", verifyToken, async (req, res) => {
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
      message: "User created",
      id: result.insertId,
    });
  });
});

// UPDATE USER
router.put("/:id", verifyToken, (req, res) => {
  const { username, personal_id, is_active } = req.body;

  const sql = `
        UPDATE users
        SET username = ?,
            personal_id = ?,
            is_active = ?
        WHERE id = ?
    `;

  db.query(
    sql,
    [username, personal_id, is_active, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User updated",
      });
    },
  );
});

/// DELETE USER
router.delete("/:id", verifyToken, (req, res) => {
  const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "User deleted",
    });
  });
});

module.exports = router;
