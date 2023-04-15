const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//const test = require('./routes/admin/Test')
const AdminRoutes = require("./routes/admin/AdminRoutes");
const StudentRoutes = require("./routes/student/StudentRoutes");
const RoleRoutes = require("./routes/RoleRoutes");
const FacultyRoutes = require("./routes/faculty/FacultyRoutes");
const CourseRoutes = require("./routes/CourseRoutes");
const AttendanceRoutes = require("./routes/AttendanceRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");
const AssignmentRoutes = require("./routes/AssignmentRoutes");
const UploadRoutes = require("./routes/uploadRoutes");
const BatchRoutes = require("./routes/faculty/BatchRoutes");



app.use("/admin", AdminRoutes);
app.use("/student", StudentRoutes);
app.use("/roles", RoleRoutes);
app.use("/faculty", FacultyRoutes);
app.use("/course", CourseRoutes);
app.use("/attendance", AttendanceRoutes)
app.use("/payment", PaymentRoutes)
app.use("/assignment", AssignmentRoutes)
app.use("/upload", UploadRoutes)
app.use("/batch", BatchRoutes)

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
