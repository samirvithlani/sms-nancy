const express = require("express");
const router = express.Router();
const {
  addStudentToCourse,
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourseById,
  updateCourseById
} = require("../controllers/CourseController");

router.get("/course/getCourse", getAllCourses);
//router.post("/course/addStudent", addStudentToCourse);
router.post("/course/addCourse", createCourse);
router.get("/course/:id", getCourseById);
router.delete("/course/:id", deleteCourseById)
router.put("/course/:id", updateCourseById)

module.exports = router;
