const Attendance = require("../schemas/AttendanceSchema");
const Faculty = require("../schemas/faculty/FacultySchema");
const moment = require("moment");

exports.checkBatchAttendance = async (req, res, next) => {
  try {
    const { batchId } = req.body;
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingAttendance = await Attendance.findOne({
      batchId,
      createdAt: { $gt: oneHourAgo },
    });

    if (existingAttendance) {
      const faculty = await Faculty.findById(existingAttendance.facultyId);
      return res.status(400).json({
        message: `Attendance for this batch has already been taken by ${faculty.name} in the last hour`,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error" + error.message,
    });
  }
};
