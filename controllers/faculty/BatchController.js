
const BatchSchema=require("../../schemas/faculty/BatchSchema");
const CourseSchema=require("../../schemas/CourseSchema");


//add course
exports.createBatch = async(req,res)=>{


const Batch = new BatchSchema(req.body)
Batch.save((err,data)=>{
  if(err){
    res.status(400).json({
      message:err.message
    })
  }
  else{
    res.status(200).json({
      message:"Batch created successfully",
      data:data
    })
  }
})
}

//get all batch
exports.getAllBatch= async(req,res)=>{
  BatchSchema.find().populate('faculty').populate('student').exec((err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Batch data fetched",
        data:data
      })
    }
  })
}

//get batch by id
exports.getBatchById= async(req,res)=>{
  BatchSchema.findById(req.params.id).populate('faculty').populate('student').exec((err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Course data fetched...",
        data:data
      })
    }
  })
}

//delete course
exports.deleteBatchById= async(req,res)=>{
  BatchSchema.findByIdAndDelete(req.params.id).populate('faculty').populate('student').exec((err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Batch deleted sucessfully...",
        data:data
      })
    }
  })
}

//update course
exports.updateBatchById=(req,res)=>{
  BatchSchema.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Batch updated successfully",
        data:data
      })
    }
  })
}

