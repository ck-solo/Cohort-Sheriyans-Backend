const jwt = require("jsonwebtoken");
const userModel = require("../models/models");

async function authMiddleware(req, res, next){
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unautorized token found",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWSTOKEN_URL);

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    req.user = user;
    
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token , please logion again",
    });
  }
};

module.exports = authMiddleware