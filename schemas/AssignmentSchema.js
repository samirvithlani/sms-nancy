const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AssignmentSchema = new Schema(
  {
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
    },

    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    courseName: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    isComplete: { type: Boolean, required: true },
    isActive: {
      type: Boolean,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    googleDriveId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Assignment", AssignmentSchema);
