const router = require("express").Router();
const authMiddleware = require("../middleware/Auth");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Bus = require("../models/busModel");

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.send({
        message: "user alraedy exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "user created successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
})
router.post("/login", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        message: "user not present",
        success: false,
        data: null,
      });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!checkPassword) {
      return res.send({
        message: "password incorrect",
        success: false,
        data: null,
      });
    }
    const jwt_token = jwt.sign(
      { userId: userExists._id },
      process.env.jwt_secret,
      {
        expiresIn: "1d",
      }
    )
    res.send({
      message: "loggedin successfully",
      success: true,
      data: jwt_token,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
})
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const userExists = await User.findById(userId.userId);
    res.send({
      data: userExists,
      message: "user fetched successfully",
      success: true,
    })
  }catch(error){
    res.send({
      data: null,
      message: error.message,
      success: false,
    })
  }
})
router.post("/get-all-buses", authMiddleware, async (req, res) => {
  try {
    const existingBuses = await Bus.find();
    return res.status(200).send({
      data: existingBuses,
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

router.post("/get-bus-by-id", authMiddleware, async (req, res) => {
  try {
    const busInfo = await Bus.findById(req.body.id);
    return res.status(200).send({
      success: true,
      data: busInfo,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      data: null,
    });
  }
});

module.exports = router;