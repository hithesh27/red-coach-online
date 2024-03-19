const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("middleware");
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.send({
        message: "Auth failed",
        data: null,
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decode;
    console.log("success");
    next();
  } catch (err) {
    console.log("Invalid token");
    return res.send({
      message: "Auth failed",
      data: null,
      success: false, // Corrected from true to false
    });
  }
};
