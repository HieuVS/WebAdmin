const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("AuthHeader: ", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    res.status(401).json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.AT_SECRET_KEY);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
};


const isOwner = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  //if(!token) return res.status(401).json({success: false, message: 'Access Token not found'});
  try {
    const decoded = jwt.verify(token, process.env.AT_SECRET_KEY);
    req.isOwner = decoded.isOwner;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .json({ success: false, message: "Access Token doesn't have role" });
  }
};

const auth = {
  verifyToken,
  isOwner,
};

module.exports = auth;
