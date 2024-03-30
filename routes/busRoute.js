const router = require("express").Router();
const authMiddleware = require("../middleware/Auth");
const Bus = require("../models/busModel");

router.post("/buses", authMiddleware, async (req, res) => {
  try {
    const existingBus = await Bus.findOne({ number: req.body.number });
    if (existingBus) {
      return res.send({
        success: "false",
        message: "Bus already exists",
      });
    }
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
  try {
    const existingBus = await Bus.find();
    return res.status(200).send({
      data: existingBus,
      success: true,
      message: "Buses fetched successfully",
    });
  }catch(error){
    return res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
})

router.post("/buses-update-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "failed to update",
    })
  }
});

router.post("/delete-bus", authMiddleware, async (req, res) => {
  try {
    await Bus.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "bus deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/get-bus-by-id", authMiddleware, async (req, res) => {
  try {
    const busInfo = await Bus.findById(req.body.id);
    return res.status(200).send({
      success: true,
      data: busInfo,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      data: null,
    });
  }
});

module.exports = router;