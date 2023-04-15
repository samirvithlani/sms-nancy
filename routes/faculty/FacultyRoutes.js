const express = require("express");
const   router = express.Router();
const {
  addFaculty,
  updateFaculty,
  getFacultyById,
  deleteFaculty,
  facultyLogin,
} = require("../../controllers/faculty/FacultyController.js");

router.delete("/faculty/delete/:id", deleteFaculty);
router.get("/faculty/findById/:id", getFacultyById);
router.post("/faculty/update/:id", updateFaculty);
router.post("/faculty/add", addFaculty);
router.post("/faculty/login",facultyLogin)

module.exports = router;
