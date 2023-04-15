const mongoose = require("mongoose");
const {string}=require("zod");
const schema = mongoose.Schema;
const StudentsSchema = schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        require: true
    },
    role:{
        type: schema.Types.ObjectId,
        ref: "role"
    },
    status:{
        type: String,

    },
    courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course'
        }
      ]
},
{
    timestamps:true
}
)
module.exports=mongoose.model("student",StudentsSchema)