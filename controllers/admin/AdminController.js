const Bcrypt = require("bcrypt")
const AdminSchema = require("../../schemas/admin/AdminSchema")
//add admin
exports.test =(req,res)=>{
    console.log("ok...")
}
exports.addAdmin=(req,res)=>{
    const salt = Bcrypt.genSaltSync(10)
    const hash = Bcrypt.hashSync(req.body.password, salt)
    var AdminObj ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hash,
        status:"Active",
        role:req.body.role
    }
    const Admin = new AdminSchema(AdminObj)
    Admin.save((err,data)=>{
        if(err){
            res.status(400).json({
                message:err.message
            })
        }
        else{
            res.status(200).json({
                message:"Admin added successfully",
                data:data
            })
        }
    })
}

//get All admins
exports.getAdmins=(req,res)=>{
    AdminSchema.find((err, data)=>{
        if(err){
            res.status(400).json({
                msg:err.message
            })
        }
        else{
            res.status(200).json({
                msg:"Admin's data fetched successfully",
                data:data
            })
        }

    })
}


//getting admin by id
exports.getAdminById=(req,res)=>{
    AdminSchema.findById(req.params.id,(err, data)=>{
        if(err){
            res.status(400).json({
                msg:err.message
            })
        }
        else{
            res.status(200).json({
                msg:"Admin's data fetched successfully",
                data:data
            })
        }

    })
}
//delete admin by id
exports.deleteAdmin=(req, res)=>{
    AdminSchema.findByIdAndDelete(req.params.id,(err, data)=>{
        if(err){
        res.status(400).json({
            msg:err.message
        })}
        else{
            res.status(200).json({
                msg:"Admin deleted successfully",
                data:data
            })
        }
    })
}


//login
exports.AdminLogin=(req,res)=>{
    AdminSchema.findOne({email:req.body.email},(err, data)=>{
        if(err){
            res.status(400).json({
                msg:err.message
            })
        }
        else{
            if(data){
                if(Bcrypt.compareSync(req.body.password,data.password)){
                    res.status(200).json({
                        msg:"Admin login successfully",
                        data:data
                    })
                }
                else{
                    res.status(400).json({
                        msg:"Invalid credentials"
                    })
                }
            }else{
                res.status(400).json({
                    msg:"Invalid credentials"
                })
            }
        }

    })
}

//update Admin
exports.UpdateAdmin= (req,res)=>{
    AdminSchema.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
        if(err){
            res.status(400).json({
                msg:err.message
            })}
            else{
                res.status(200).json({
                    msg:"Admin updated successfully",
                    data:data
                })
            }
    })
}
