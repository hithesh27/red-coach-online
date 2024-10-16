const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const authMiddleware = require("../middleware/Auth");
// const stripe=require('stripe')(process.env.stripe_key);
// const { v4: uuidv4 } = require('uuid');

router.post('/get-bookings-by-user-id',authMiddleware,async (req,res)=>{

  try{
      const bookings=await Booking.find({ user : req.body.userId.userId})
        .populate('bus')
        .populate('user')
        res.status(200).send(
          {
            message:'bookings fetched successfully',
            data:bookings,
            success:true
          }
        )
  }catch(error){
        res.status(500).send({
          message:'bookings fetched failed',
          data:error,
          success:false
        })
  }
})

router.post('/make-payment',authMiddleware,async (req,res)=>{
try {
    const {token,amount}=req.body;
    /*const customer=await stripe.customers.create({
      email:token.email,
      source:token.id
    })
    console.log('pay2');
    const payment = await stripe.charges.create({
      amount:amount,
      currency:'inr',
      customer:customer.id,
      receipt_email:token.email,
      description:'test payment'
    },{
      idempotencyKey:uuidv4()
    })
    console.log('pay2');
    // if(payment){*/
      res.status(200).send({
        message:'payment successful',
        data:{
          transactionId: '1'
        },
        success:true
      })

    // }else{
    //   res.status(500).send({
    //     message:'payment failed',
    //     data:error,
    //     success:false
    //   })
    // }
} catch (error) {
  res.status(500).send({
    message:'payment failed',
    data:error,
    success:false
  })
}
})

router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking({
      user: req.body.userId.userId,
      ...req.body
    })
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.selectedSeats];
    await bus.save();
    return res.status(200).send({
      message: "booking successful",
      data: newBooking,
      success: true,
    });
  }catch(error) {
    return res.status(500).send({
      message: "booking failed",
      data: error,
      success: false,
    });
  }
});
module.exports = router;