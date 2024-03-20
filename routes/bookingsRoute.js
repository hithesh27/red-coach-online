const router = require("express").Router();
const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const authMiddleware = require("../middleware/Auth");

router.post("/book-seat", authMiddleware, async (req, res) => {
  console.log("1.", req.body.userId);
  try {
    const newBooking = new Booking({
      user: req.body.userId.userId,
      ...req.body,
      transactionId: "1234",
    });

    console.log("1.", newBooking);
    await newBooking.save();
    console.log("2.");
    const bus = await Bus.findById(req.body.bus);

    console.log("3", bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.selectedSeats];
    console.log("3", bus);
    await bus.save();
    console.log("4");
    return res.status(200).send({
      message: "booking successful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    return res.status(200).send({
      message: "booking failed",
      data: error,
      success: false,
    });
  }
});

module.exports = router;
