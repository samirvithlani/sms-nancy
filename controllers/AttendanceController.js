const Attendance = require("../schemas/AttendanceSchema");
const Course = require("../schemas/CourseSchema");
const Student = require("../schemas/student/StudentSchema");
const facultySchema = require("../schemas/faculty/FacultySchema");

exports.takeAttendance = async (req, res) => {
  try {
    const { courseId, facultyId, date, students } = req.body;
    const studentIds = req.body.students.map((student) => student.student);
    if (!courseId || !facultyId || !students || !date || students.length == 0) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    const faculty = await facultySchema.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }
    const inCourseStudent = course.students.map((student) =>
      student.toString()
    );
    console.log("in course students", inCourseStudent);

    const matchedStudentIds = [...new Set(studentIds.filter((studentId) =>
      inCourseStudent.includes(studentId.toString())
    ))];
    console.log("matched studentIds", matchedStudentIds);

    const invalidStudentIds = studentIds.filter(
      (student) => !inCourseStudent.includes(student.toString())
    );
    console.log("invalidStudentIds", invalidStudentIds);
    if (invalidStudentIds.length > 0) {
      return res.status(400).json({
        message: `Student(s) ${invalidStudentIds} not found in course`,
      });
    }

    const existingAttendance = await Attendance.findOne({
      courseId: courseId,
      facultyId: facultyId,
      date: date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already taken",
      });
    }

    const attendance = new Attendance({
      courseId: courseId,
      facultyId: facultyId,
      date,
      students: matchedStudentIds.map((studentId) => ({
        student: studentId,
        status: "Present",
      })),
    });

    const savedAttendance = await attendance.save();

    await Course.findByIdAndUpdate(
      courseId,
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
