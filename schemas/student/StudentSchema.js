const mongoose = require("mongoose");
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
        type: Number,
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
        required: true
    },
    role:{
        type: schema.Types.ObjectId,
        ref: "role"
    },
    status:{
        type: String,

    },
    
},
{
    timestamps:true
}
)
module.exports=mongoose.model("Student",StudentsSchema)