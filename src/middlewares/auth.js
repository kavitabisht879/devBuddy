const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {  
    const { token } = req.cookies;
    console.log("token from cookie:", token);
    if (!token) {
      throw new Error("Token is not valid!!");
    }
    const decodedObj = await jwt.verify(token, "DEV@123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user
    next();
  } catch (error) {
    res.status(400).send("Error:" + error.message);
  }
};

module.exports = {
  userAuth,
};
