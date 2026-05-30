const AttendanceModel = require("../models/attendanceModel");

const AttendanceController = {
  getAll: (req, res) => {
    AttendanceModel.getAll((err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    });
  },

  getById: (req, res) => {
    AttendanceModel.getById(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);
    });
  },

  create: (req, res) => {
    const data = {
      ...req.body,
      created_by: req.user.id,
    };

    AttendanceModel.create(data, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Attendance created",
        id: result.insertId,
      });
    });
  },

  update: (req, res) => {
    const data = {
      ...req.body,
      updated_by: req.user.id,
    };

    AttendanceModel.update(req.params.id, data, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Attendance updated",
      });
    });
  },

  delete: (req, res) => {
    AttendanceModel.delete(req.params.id, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Attendance deleted",
      });
    });
  },
};

module.exports = AttendanceController;
