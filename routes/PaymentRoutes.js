const express = require('express');
const router = express.Router()    

const PaymentController = require("../payment/PaymentController")

router.post("/payment",PaymentController.PaymentMethod)

module.exports = router;

