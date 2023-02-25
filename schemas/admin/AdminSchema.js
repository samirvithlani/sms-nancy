const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const AdminSchema= new Schema({
    firstName: {
        type: String,
         required: true   
    },
    lastName:{
        type: String,
         required: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: Schema.Types.ObjectId, 
        ref: "role"
    },
    status:{
        type: String,

    }


},
{
    timestamps: true
})
module.exports= mongoose.model("Admin", AdminSchema)