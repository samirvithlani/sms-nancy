const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");

router.post("/attendance", AttendanceController.takeAttendance);

module.exports = router;
