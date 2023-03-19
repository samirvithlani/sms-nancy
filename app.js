const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const AdminRoutes = require("./routes/admin/AdminRoutes");
const StudentRoutes = require("./routes/student/StudentRoutes");
const RoleRoutes = require("./routes/RoleRoutes");
const FacultyRoutes = require("./routes/faculty/FacultyRoutes");
const CourseRoutes = require("./routes/CourseRoutes");
const AttendanceRoutes = require("./routes/AttendanceRoutes");
const BatchRoutes = require("./routes/BatchRoutes");

app.use("/admin", AdminRoutes);
app.use("/student", StudentRoutes);
app.use("/roles", RoleRoutes);
app.use("/faculty", FacultyRoutes);
app.use("/course", CourseRoutes);
app.use("/attendance", AttendanceRoutes);
app.use("/batch", BatchRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/SMS-Nancy", (err) => {
  if (err) {
    console.log("Database not connected");
  } else {
    console.log("Database connected");
  }
});
//server
app.listen(3000, (err) => {
  if (err) {
    console.log("Server not started");
  } else {
    console.log("Server started..." + PORT);
  }
});
