const express = require("express");
const { validateSignupData } = require("../utills/validation"); 
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

// Create user API
authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash:", passwordHash);

    // Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully...");
  } catch (error) {
    res.status(400).send("Error saving the user: " + error.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      httpOnly: true, // recommended for security
    });
    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(400).send("Something went wrong");
  }
});

// Logout API
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out successfully");
});

module.exports = { authRouter };

