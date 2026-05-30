const express = require("express");
const router = express.Router();

const AttendanceController = require("../controllers/attendanceController");
//const verifyToken = require("../middleware/verifyToken");
const verifyToken = require("../../Auth/middleware/auth");

router.get("/", verifyToken, AttendanceController.getAll);
router.get("/:id", verifyToken, AttendanceController.getById);
router.post("/", verifyToken, AttendanceController.create);
router.put("/:id", verifyToken, AttendanceController.update);
router.delete("/:id", verifyToken, AttendanceController.delete);

module.exports = router;
