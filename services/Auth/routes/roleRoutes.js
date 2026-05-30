const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/auth");

// GET ALL ROLES
// router.get("/", verifyToken, (req, res) => {
router.get("/", (req, res) => {
  db.query("SELECT * FROM roles", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// CREATE ROLE
router.post("/", verifyToken, (req, res) => {
  const { role_name } = req.body;

  const sql = `
        INSERT INTO roles (role_name)
        VALUES (?)
    `;

  db.query(sql, [role_name], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Role created",
      id: result.insertId,
    });
  });
});

// UPDATE ROLE
router.put("/:id", verifyToken, (req, res) => {
  const { role_name, is_active } = req.body;

  const sql = `
        UPDATE roles
        SET role_name = ?,
            is_active = ?
        WHERE id = ?
    `;

  db.query(sql, [role_name, is_active, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Role updated",
    });
  });
});

// DELETE ROLE
router.delete("/:id", verifyToken, (req, res) => {
  const sql = `
        DELETE FROM roles
        WHERE id = ?
    `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Role deleted",
    });
  });
});

module.exports = router;
