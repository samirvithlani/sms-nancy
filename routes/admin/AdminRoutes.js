const express = require("express")
const router = express.Router()

const AdminController = require("../../controllers/admin/AdminController")

router.post("/admin",AdminController.addAdmin)
router.get("/admin/:id",AdminController.getAdminById)
router.get("/admin",AdminController.getAdmins)
router.delete("/admin/:id",AdminController.deleteAdmin)
router.post("/admin/login",AdminController.AdminLogin)
router.put("/admin/:id", AdminController.UpdateAdmin)

module.exports=router