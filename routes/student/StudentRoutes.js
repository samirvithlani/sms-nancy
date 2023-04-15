const express = require("express")
const router = express.Router()

const StudentController = require("../../controllers/student/StudentController")


router.post("/student/add",StudentController.addStudent)
router.get("/student/:id", StudentController.getStudentById)
router.get("/student",StudentController.getStudents)
router.delete("/student/:id",StudentController.deleteStudent)
router.post("/student/login", StudentController.StudentLogin)
router.put("/student/:id", StudentController.UpdateStudent)

module.exports=router