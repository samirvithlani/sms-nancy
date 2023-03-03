const Course = require("../schemas/CourseSchema");
const Student = require("../schemas/student/StudentSchema");

exports.getAllCourses = (req, res) => {
  Course.find()
    .populate("students", "-password") // populate students with their details excluding password
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      } else {
        return res.status(200).json({
          message: "All courses",
          data: data,
        });
      }
    });
};

exports.createCourse = (req, res) => {
  // Validate request body
  const { name, code } = req.body;
  if (!name || !code) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  // Check if course already exists
  Course.findOne({ code: code }, (err, data) => {
    if (err) {
      return res.status(400).send("Bad request");
    } else if (data) {
      return res.status(400).send("Course already exists.");
    } else {
      // Create new course
      const course = new Course({
        name,
        code,
      });
      course.save((err, data) => {
        if (err) {
          res.status(500).json({
            message: "Error in saving data",
          });
        } else {
          res.status(200).json({
            message: "Course created successfully",
            data: data,
          });
        }
      });
    }
  });
};

/* exports.addStudentToCourse = (req, res) => {
  const { courseId, studentId } = req.body;
  if (!courseId || !studentId) {
    return res.status(400).json({
      message: 'Missing required fields',
    });
  }

  Course.findById(courseId, (err, course) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    } else if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    } else if (course.students.includes(studentId)) {
      return res.status(400).json({
        message: 'You are already enrolled in this course',
      });
    } else {
      Course.findByIdAndUpdate(
        courseId,
        { $addToSet: { students: studentId } },
        { new: true }
      )
        .populate('students', '-password')
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              message: err.message,
            });
          } else {
            return res.status(200).json({
              message: 'Student added to course successfully',
              data: data,
            });
          }
        });
    }
  });
}; */

/* const addCourseToStudent = (studentId, courseId) => {
  return Student.findByIdAndUpdate(
    studentId,
    { $addToSet: { courses: courseId } },
    { new: true }
  );
}; */

/* exports.addStudentToCourse = (req, res) => {
  const { courseId, studentIds } = req.body;
  if (!courseId || !studentIds || !Array.isArray(studentIds)) {
    return res.status(400).json({
      message: "Missing required fields or invalid input",
    });
  }

  // Check if course exists
  Course.findById(courseId, (err, course) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    } else if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    } else {
      // Find students and add them to course
      Student.find({ _id: { $in: studentIds } }, (err, students) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        } else if (!students || students.length === 0) {
          return res.status(404).json({
            message: "Students not found",
          });
        } else {
          const existingStudentIds = course.students.map((s) => s.toString());
          const newStudentIds = studentIds.filter(
            (id) => !existingStudentIds.includes(id)
          );
          console.log(newStudentIds);
          if (newStudentIds.length === 0) {
            return res.status(400).json({
              message: "Students already enrolled in course",
            });
          }

          Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { students: { $each: newStudentIds } } },
            { new: true }
          )
            .populate("students", "-password")
            .exec((err, data) => {
              if (err) {
                return res.status(400).json({
                  message: err.message,
                });
              } else if (!data) {
                return res.status(404).json({
                  message: "Course not found",
                });
              } else {
                // Add course to each student's courses array
                const promises = newStudentIds.map((id) =>
                  addCourseToStudent(id, courseId)
                );
                Promise.all(promises)
                  .then(() => {
                    return res.status(200).json({
                      message: "Students added to course successfully",
                      data: data,
                    });
                  })
                  .catch((err) => {
                    return res.status(500).json({
                      message: err.message,
                    });
                  });
              }
            });
        }
      });
    }
  });
}; */

exports.addStudentToCourse = async (req, res) => {
  const { courseId, studentIds } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const validStudentIds = [];
    const inValidStudentIds = [];
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student) {
        validStudentIds.push(studentId);
      } else {
        inValidStudentIds.push(studentId);
      }
      console.log("validStudentIds", validStudentIds);
      console.log("inValidStudentIds", inValidStudentIds);
    }

    if (validStudentIds.length === 0) {
      return res.status(400).json({ message: "No valid student ids" });
    }

    const existingStudentIds = course.students.map((student) =>
      student.toString()
    );
    const newStudentIds = validStudentIds.filter(
      (id) => !existingStudentIds.includes(id)
    );
    if (newStudentIds.length === 0) {
      return res
        .status(400)
        .json({ message: "All students already in course" });
    }
    course.students.push(...newStudentIds);
    await course.save();

    for (const studentId of newStudentIds) {
      const student = await Student.findById(studentId);
      student.courses.push(course._id);
      await student.save();
    }
    return res
      .status(200)
      .json({ message: "Students added to course successfully", data: course });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
