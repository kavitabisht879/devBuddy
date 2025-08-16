const express = require("express");
const { userAuth } = require("../middlewares/auth");
const  ConnectionRequest  = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender about skills"
    );
    //   .popolate("fromUserId",["firstName" , "lastName"]);
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
});
module.exports = { userRouter };
// 34
