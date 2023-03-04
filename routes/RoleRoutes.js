const express = require('express');
const router = express.Router();
const { getAllRoles, createRole } = require('../controllers/RoleController');

router.get('/allRoles',  getAllRoles);
router.post('/roles',  createRole);

module.exports = router;
