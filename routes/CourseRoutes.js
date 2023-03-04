const express = require("express");
const router = express.Router();
const {
  addStudentToCourse,
  createCourse,
  getAllCourses,
} = require("../controllers/CourseController");

router.get("/course/allCourse", getAllCourses);
router.post("/course/addStudent", addStudentToCourse);
router.post("/course/addCourse", createCourse);

module.exports = router;
