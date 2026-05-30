const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/user-roles", userRoleRoutes);

app.get("/", (req, res) => {
  res.send("Sadewa API Running");
});

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";

// https.createServer(options, app).listen(3002, "0.0.0.0", () => {
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} with DB_HOST ${DB_HOST}`);
});
