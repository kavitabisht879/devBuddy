const express = require("express");
const { validaeSignupData } = require("../utills/validation");
const user = require("../models/user");
const  authRouter = express.Router()
const bcrypt = require("bcrypt");


//  create user api
authRouter.post("/signup", async (req, res) => {
    // validation of data
    validaeSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("passwordHash:", passwordHash);
  
    // creating a new instance of the user model
    const user = new user({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
  
    try {
      await user.save();
      res.send("user added sucessfully...");
    } catch (error) {
      res.status(400).send("error saving the user:" + error.message);
    }
  });
  
  // login api
  authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
      const isValidUser = await user.findOne({ emailId });
      if (!isValidUser) {
        return res.status(404).send("invalid credentials");
      }
      console.log("passwordHash:", password);
  
      const isValidPassword = await isValidUser.validatePassword(password);
      if (!isValidPassword) {
        return res.status(401).send("invalid credentials");
      }
      const token = await user.getJWT();
  
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("login successful");
    } catch (error) {
      res.status(400).send("something went wrong");
    }
  });
  
  module.exports = {authRouter}