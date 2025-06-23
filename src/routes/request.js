const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

//  send connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " sent the connection request!");
});

module.exports = {requestRouter};
