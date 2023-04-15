const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AttendanceSchema = new Schema({
  presentStudent :[
      {
          type:Schema.Types.ObjectId,
          ref:'student',
          unique:true,
      }
  ],
  absentStudent :[
      {
          type:Schema.Types.ObjectId,
          ref:'student',
          unique:true,
      }
  ],
  course:{
      type:Schema.Types.ObjectId,
      ref:'Course',
      unique:true,
  },
  absentReason:{
      type:String,
      
  },
  date:{
      type:String,
      required:true
      
  },
  time:{
      type:String,
      required:true
  },
  faculty:{
      type:Schema.Types.ObjectId,
      ref:'faculty',
      unique:true,

  },
  batch:{
    type:Schema.Types.ObjectId,
    ref:'Batch'
  }
})

module.exports = mongoose.model("Attendance", AttendanceSchema);
