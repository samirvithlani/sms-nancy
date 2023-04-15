const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/AttendanceController");

router.post("/attendance", AttendanceController.addAttendance);
router.get("/attendance", AttendanceController.getStudentAttendance);
router.get("/attendance/:id", AttendanceController.getStudentAttendanceByBatch);
router.put("/attendance/:id", AttendanceController.updateAttendanceById);
router.delete("/attendance/:id", AttendanceController.deleteAttendanceById);


module.exports = router;
 