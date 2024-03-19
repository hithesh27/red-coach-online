const router = require("express").Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middleware/Auth");
router.post("/buses", authMiddleware, async (req, res) => {
  try {
    const existingBus = await Bus.findOne({ number: req.body.number });
    if (existingBus) {
      return res.send({
        success: "false",
        message: "Bus already exists",
      });
    }
    console.log(req.body);
    const newBus = new Bus(req.body);
    await newBus.save();
    return res.send({
      success: "true",
      message: "Bus saved successfully",
    });
  } catch (error) {
    return res.send({
      success: "false",
      message: error.message,
    });
  }
});

router.post("/get-all-buses", authMiddleware, async (req, res) => {
  console.log("i am trying to fetch buses");
  try {
    const existingBus = await Bus.find();
    return res.status(200).send({
      data: existingBus,
      success: true,
      message: "Buses fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
