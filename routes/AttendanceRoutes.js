const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");
const { checkFacultyAttendance } = require("../util/CheckAttendance");
const { checkBatchAttendance } = require("../util/CheckBatchAttendance");

router.post("/attendance",checkBatchAttendance, AttendanceController.takeAttendance);

module.exports = router;
