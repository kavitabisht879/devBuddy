const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utills/validation");
const profileRouter = express.Router();

// get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

//  update profile

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    console.log("loggedInUser", loggedInUser);
    res.send("Profile updated successfully.");

  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});
module.exports = { profileRouter };
