const express = require('express')
const router = express.Router()
const AdminValidations = require("../../Util/AdminValidationUtil")
const validate = require("../../Middleware/ZodMiddleware")
const AdminController = require("../../controllers/admin/AdminController")

router.get("/ok",AdminController.test)
router.post("/admin/add",AdminController.addAdmin)
router.get("/admin/:id",AdminController.getAdminById)
router.get("/admin",AdminController.getAdmins)
router.delete("/admin/:id",AdminController.deleteAdmin)
router.post("/admin/login",AdminController.AdminLogin)
router.put("/admin/:id", AdminController.UpdateAdmin)
module.exports = router;