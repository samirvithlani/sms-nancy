const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BatchSchema = new Schema({
    batchName: {
        type: String,
        required: true
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course'
    },
    faculty:[{
        type:Schema.Types.ObjectId,
        ref:'faculty'
    }],
    student:[{
        type:Schema.Types.ObjectId,
        ref:'student'
    }],
    time:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    }
})
module.exports = mongoose.model('Batch',BatchSchema);