const Attendance = require("../schemas/AttendanceSchema");
const Batch = require("../schemas/BatchSchema");
const Student = require("../schemas/student/StudentSchema");
const facultySchema = require("../schemas/faculty/FacultySchema");

exports.takeAttendance = async (req, res) => {
  try {
    const { batchId, facultyId, date, students } = req.body;
    const studentIds = req.body.students.map((student) => student.student);
    if (!batchId || !facultyId || !students || !date || students.length == 0) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }
    const faculty = await facultySchema.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }
    const inBatchStudent = batch.students.map((student) =>
      student.toString()  
    );
    console.log("in batch students", inBatchStudent);

    const matchedStudentIds = [...new Set(studentIds.filter((studentId) =>
      inBatchStudent.includes(studentId.toString())
    ))];
    console.log("matched studentIds", matchedStudentIds);

    const invalidStudentIds = studentIds.filter(
      (student) => !inBatchStudent.includes(student.toString())
    );
    console.log("invalidStudentIds", invalidStudentIds);
    if (invalidStudentIds.length > 0) {
      return res.status(400).json({
        message: `Student(s) ${invalidStudentIds} not found in batch`,
      });
    }

    const attendance = new Attendance({
      batchId: batchId,
      facultyId: facultyId,
      date,
      students: matchedStudentIds.map((studentId) => ({
        student: studentId,
        status: "Present",
      })),
    });

    const savedAttendance = await attendance.save();

    await Batch.findByIdAndUpdate(
      batchId,
      { $addToSet: { attendances: savedAttendance._id } },
      { new: true }
    );

    return res.status(201).json({
      message: "Attendance taken successfully",
      data: savedAttendance,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
