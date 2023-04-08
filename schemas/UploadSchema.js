const mongoose = require('mongoose')

const schema = mongoose.Schema
const uploadSchema = new schema({
    
    assignmentName: {
        type: String,
        required: true
    },

    assignmentType: {
        type: String,
        required: true
    },

    assignmentSize:{
        type: Number,
        required: true
    },

    assignmentPath:{
        type: String,
        //required: true
    },
    googleDriveId: {
        type: String,
       // required: true,
      },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('upload', uploadSchema)