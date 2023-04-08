const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/UploadController')

router.post('/upload',uploadController.uploadAssignment)
module.exports = router;