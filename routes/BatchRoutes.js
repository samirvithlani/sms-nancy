const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batchController");

router.post("/batch/addBatch", batchController.createBatch);
router.post("/batch/addStudent", batchController.addStudentToBatch);

module.exports = router;
