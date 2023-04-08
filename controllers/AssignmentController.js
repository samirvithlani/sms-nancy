const AssignmentSchema = require('../schemas/AssignmentSchema')
//create assignment
exports.CreateAssignment = (req, res)=>{
    const assignment =  AssignmentSchema(req.body)
    assignment.save((err,data)=>{
        if(err){
            return res.status(400).json({
                message:err
                
            })
        }else{
            return res.status(200).json({
                data:data ,
                message:'Assignment Created Successfully'
            })
        }
    })
}
//get all assignments
exports.GetAllAssignments = (req, res)=>{
    AssignmentSchema.find((err,data)=>{
        if(err){
            return res.status(400).json({
                message:err
                
            })
        }else{
            return res.status(200).json({
                data:data,
                message:'Assignments Found Successfully'
            })
        }
    })
}
//get assignment by id
exports.GetAssignmentById = (req, res)=>{
    AssignmentSchema.findById(req.params.id,(err,data)=>{
        if(err){
            return res.status(400).json({
                message:err
                
            })
        }else{
            return res.status(200).json({
                data:data,
                message:'Assignment Found Successfully'
            })
        }
    })
}
//update assignment
exports.UpdateAssignment = (req, res)=>{
    AssignmentSchema.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
        if(err){
            return res.status(400).json({
                message:err
                
            })
        }else{
            return res.status(200).json({
                data:data,
                message:'Assignment Updated Successfully'
            })
        }
    })
}
//delete assignment
exports.DeleteAssignment = (req, res)=>{
    AssignmentSchema.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            return res.status(400).json({
                message:err
                
            })
        }else{
            return res.status(200).json({
                data:data,
                message:'Assignment Deleted Successfully'
            })
        }
    })
}
