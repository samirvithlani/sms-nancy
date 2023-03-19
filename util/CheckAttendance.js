const Attendance = require("../schemas/AttendanceSchema");
const moment = require("moment");

exports.checkFacultyAttendance = async (req, res, next) => {
  try {
    const { batchId, facultyId } = req.body;
    const existingAttendance = await Attendance.findOne({
      batchId,
      facultyId,
      date: moment().format("YYYY-MM-DD"),
    });

    if (existingAttendance) {
      return res.status(400).json({
        message:
          "Attendance for this batch has already been taken by this faculty today",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error"+error.message,
    });
  }
};
