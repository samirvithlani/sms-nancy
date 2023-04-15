
const CourseSchema=require("../schemas/CourseSchema");


//add course
exports.createCourse = async(req,res)=>{
var course={
  name:req.body.name,
  code:req.body.code,
  faculty:req.body.faculty
}
const Course = new CourseSchema(course)
Course.save((err,data)=>{
  if(err){
    res.status(400).json({
      message:err.message
    })
  }
  else{
    res.status(200).json({
      message:"Course added successfully",
      data:data
    })
  }
})
}

//get all courses
exports.getAllCourses= async(req,res)=>{
  CourseSchema.find().populate('faculty').exec((err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Course data fetched",
        data:data
      })
    }
  })
}

//get course by id
exports.getCourseById= async(req,res)=>{
  CourseSchema.findById(req.params.id).populate('faculty').exec((err,data)=>{
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
exports.deleteCourseById= async(req,res)=>{
  CourseSchema.findByIdAndDelete(req.params.id).populate('faculty').exec((err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Course deleted sucessfully...",
        data:data
      })
    }
  })
}

//update course
exports.updateCourseById=(req,res)=>{
  CourseSchema.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
    if(err){
      res.status(400).json({
        msg:err.message
      })
    }
    else{
      res.status(200).json({
        msg:"Course updated successfully",
        data:data
      })
    }
  })
}

