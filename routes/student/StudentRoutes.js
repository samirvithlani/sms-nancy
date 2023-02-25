const express = require("express")
const router = express.Router()

const StudentController = require("../../controllers/student/StudentController")

router.post("/student",StudentController.addstudent)
