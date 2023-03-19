const batchSchema = require("../schemas/BatchSchema");
const courseSchema = require("../schemas/CourseSchema");
const studentSchema = require("../schemas/student/StudentSchema");

exports.createBatch = (req, res) => {
  const { name, course } = new batchSchema(req.body);
  courseSchema.findById(course, (err, course) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    } else if (!course) {
      res.status(404).json({
        message: "Course not found",
      });
    } else {
      batchSchema.findOne({ name, course }, (err, batch) => {
        if (err) {
          res.status(500).json({
            message: "Internal server error",
          });
        } else if (batch) {
          res.status(409).json({
            message: "Batch already exists",
          });
        } else {
          const newBatch = new batchSchema(req.body);
          newBatch.save(async (err, batch) => {
            if (err) {
              res.status(500).json({
                message: "Internal server error",
              });
            } else {
              course.batches.push(batch._id);
              await course.save();
              res.status(201).json({
                message: "Batch created successfully",
                data: batch,
              });
            }
          });
        }
      });
    }
  });
};

/* exports.addStudentToBatch = (req, res) => {
  const { batch, student } = req.body;
  const validStudentIds = [];
  const inCourseStudentIds = [];

  batchSchema.findById(batch, (err, batch) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    } else if (!batch) {
      res.status(404).json({
        message: "Batch not found",
      });
    } else {
      const course = courseSchema.findById(batch.course);
      for (const studentId of student) {
        studentSchema.findById(studentId, (err, student) => {
          if (student) {
            validStudentIds.push(studentId);
            studentSchema.findById(
              studentId,
              student.courses.includes(course._id),
              (err, data) => {
                if (err) {
                  res.status(500).json({
                    message: "Internal server error" + err.message,
                  });
                } else if (!data) {
                  res.status(409).json({
                    message: `Student ${studentId} is not in course ${course._id}`,
                  });
                } else {
                  inCourseStudentIds.push(studentId);
                  batchSchema.findByIdAndUpdate(
                    batch._id,
                    { $push: { students: student._id } },
                    (err, data) => {
                      if (err) {
                        res.status(500).json({
                          message: "Internal server error" + err.message,
                        });
                      } else {
                        res.status(201).json({
                          message: "Student added to batch successfully",
                          data: data,
                        });
                      }
                    }
                  );
                }
              }
            )
          } else {
            res.status(404).json({
              message: `Student with id ${studentId} not found`,
            });
          }
        });
      }
    }
  });
}; */

exports.addStudentToBatch = async (req, res) => {
  const { batchId, student } = req.body;

  try {
    const batch = await batchSchema.findById(batchId);
    if (!batch) {
      return res.status(404).json({
        message: "Batch not found",
      });
    }

    const course = await courseSchema.findById(batch.course);
    const validStudentIds = [];
    const inCourseStudentIds = [];

    for (const studentId of student) {
      const student = await studentSchema.findById(studentId);
      if (!student) {
        return res.status(404).json({
          message: `Student with id ${studentId} not found`,
        });
      }

      if (student.courses.includes(course._id)) {
        validStudentIds.push(studentId);
        inCourseStudentIds.push(studentId);
        await batchSchema.findByIdAndUpdate(batch._id, {
          $push: { students: student._id },
        });
      } else {
        return res.status(409).json({
          message: `Student ${studentId} is not in course ${course._id}`,
        });
      }
    }

    return res.status(201).json({
      message: "Students added to batch successfully",
      data: {
        batch: batch,
        validStudentIds: validStudentIds,
        inCourseStudentIds: inCourseStudentIds,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error" + err.message,
    });
  }
};
