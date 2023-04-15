const StudentAttendanceSchema = require("../schemas/AttendanceSchema");
const BatchSchema=require("../schemas/faculty/BatchSchema");

exports.addAttendance = (req, res) => {
  const { presentStudent, absentStudent, batch, absentReason, date, time } =
    req.body;

  const newAttendance = new StudentAttendanceSchema({
    presentStudent,
    absentStudent,
    batch,
    absentReason,
    date,
    time,
  });

  newAttendance
    .save()
    .then((attendance) => {
      res.status(200).json({
        success: true,
        message: "Attendance added successfully",
        attendance,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to add attendance",
        errorMessage: err.message,
      });
    });
};
exports.getStudentAttendanceByBatch = (req, res) => {
  const { batch } = req.body;
  StudentAttendanceSchema.find({ batch })
    .populate("presentStudent")
    .populate("absentStudent")
    .populate("batch")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Failed to get attendance",
          errorMessage: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Attendance get successfully",
          data,
        });
      }
    });
};
exports.getStudentAttendance = (req, res) => {
  StudentAttendanceSchema.find()
    .populate("presentStudent")
    .populate("absentStudent")
    .populate("batch")
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Failed to get attendance",
          errorMessage: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Attendance get successfully",
          data,
        });
      }
    });
};

exports.deleteAttendanceById= async(req,res)=>{
  StudentAttendanceSchema.findByIdAndDelete(req.params.id,(err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Attendance deleted sucessfully...",
        data:data
      })
    }
  })
}
exports.updateAttendanceById  = (req,res)=>{
  StudentAttendanceSchema.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Attendance updated successfully",
        data:data
      })
    }
  })
}


