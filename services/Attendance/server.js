const express = require("express");
const cors = require("cors");
require("dotenv").config();

const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/attendances", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("Attendance Service Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
