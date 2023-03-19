const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  faculties: [
    {
      facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  attendances:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
    }
  ]
});

module.exports = mongoose.model("Batch", batchSchema);
