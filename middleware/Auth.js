const jwt = require("jsonwebtoken");

module.exports = (req, res, next)  => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
      return res.send({
        message: "Auth failed",
        data: null,
        success: false,
      });
    }
    const decode = jwt.verify(token,process.env.jwt_secret);
    req.body.userId = decode;
    next();
  } catch (err) {
    return res.send({
      message: "Auth failed",
      data: null,
      success: false, // Corrected from true to false
    })
  }
}