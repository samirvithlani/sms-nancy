const multer = require("multer");
const path = require("path");
const uploadSchema = require("../schemas/UploadSchema");
const googleController = require("../controllers/GoogleController");
//const uploadSchema=require("../schemas/UploadSchemaa");

const storage = multer.diskStorage({
  filename:function(req,file,cb){
    cb(null,file.originalname)

  }
})

const upload = multer({
  storage:storage,
  limits:{fileSize:15000000}
}).single('file')

exports.uploadAssignment = async(req,res) => {
  upload(req, res, async(err) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: "No file selected" });
      } else {
        if (req.file.size > 150000000) {
          return res.status(400).json({ message: "file too large" });
        } else {
          var x = await googleController.uploadFile(req.file.path);
          if (x !== undefined || x !== null || x!==0) {
           //const abspath = path.resolve(req.file.OriginalName)
            const uploadobj = new uploadSchema({
                assignmentName:req.file.OriginalName,
              //  assignmentPath: abspath,
                assignmentSize: req.file.size,
                assignmentType: req.file.mimeType,
                googleDriveId: x
            })
            uploadobj.save((err,data)=>{
                if(err){
                    res.status(400).json({message:'Error in uploading assignment'})
                }else{
                    res.status(200).json({message:'assignment uploaded successfully',
                     
                })
                }
            })
          }
        }
      }
    }
  });
};
