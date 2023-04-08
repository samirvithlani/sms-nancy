const express = require('express'); 
const router = express.Router();
const AssignmentController = require('../controllers/AssignmentController')

router.post('/assignment', AssignmentController.CreateAssignment)
router.get('/assignment', AssignmentController.GetAllAssignments)
router.get('/assignment/:id', AssignmentController.GetAssignmentById)
router.delete('/assignment/:id', AssignmentController.DeleteAssignment)
router.put('/assignment/:id', AssignmentController.UpdateAssignment)

module.exports = router;