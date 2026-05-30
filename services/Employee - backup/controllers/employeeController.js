const EmployeeModel = require("../models/employeeModel");

const EmployeeController = {
  getAll: (req, res) => {
    EmployeeModel.getAll((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    });
  },

  getById: (req, res) => {
    EmployeeModel.getById(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    });
  },

  create: (req, res) => {
    EmployeeModel.create(req.body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Employee created",
        id: result.insertId,
      });
    });
  },

  update: (req, res) => {
    EmployeeModel.update(req.params.id, req.body, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Employee updated",
      });
    });
  },

  delete: (req, res) => {
    EmployeeModel.delete(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Employee deleted",
      });
    });
  },
};

module.exports = EmployeeController;
