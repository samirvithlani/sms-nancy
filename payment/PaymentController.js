
const stripe = require('stripe')('sk_test_51MhbUnSF0fujg859L7D7dUFNl8P3c2qQd7Ed8M4Qspnb4ETx94jJGqeYEZP7riSJ58fdKgHMQgCdPmDPyJTEmuU500zjiBMcFX')
exports.payment = async(req, res)=> {
    const { product } = req.body; 
    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ["card"], 
      line_items: [ 
        { 
          price_data: { 
            currency: "inr", 
            product_data: { 
              name: product.name, 
            }, 
            unit_amount: product.price * 100, 
          }, 
          quantity: product.quantity, 
        }, 
      ], 
      mode: "payment", 
      success_url: "http://localhost:3000/success", 
      cancel_url: "http://localhost:3000/cancel", 
    }); 
    res.json({ id: session.id }); 
}
