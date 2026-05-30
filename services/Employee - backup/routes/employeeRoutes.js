const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/employeeController");
// const verifyToken = require("../middleware/verifyToken");
const verifyToken = require("../../Auth/middleware/auth");

//router.get("/", verifyToken, EmployeeController.getAll);
router.get("/", verifyToken, EmployeeController.getAll);
router.get("/:id", verifyToken, EmployeeController.getById);
router.post("/", verifyToken, EmployeeController.create);
router.put("/:id", verifyToken, EmployeeController.update);
router.delete("/:id", verifyToken, EmployeeController.delete);

module.exports = router;
