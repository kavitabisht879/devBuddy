//  in front end part use redux toolkit for state and rtk query for api data for this application
// -3
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./models/user");
const { validaeSignupData } = require("./utills/validation");
const bcrypt = require("bcrypt");
const user = require("./models/user");
const { userAuth } = require("./middlewares/auth");

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("server is runnning on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });

app.use(express.json());
app.use(cookieParser());

//  create user api
app.post("/signup", async (req, res) => {
  // validation of data
  validaeSignupData(req);
  const { firstName, lastName, emailId, password } = req.body;
  // encrypt the password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log("passwordHash:", passwordHash);

  // creating a new instance of the user model
  const user = new User({
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
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const isValidUser = await user.findOne({ emailId });
    if (!isValidUser) {
      return res.status(404).send("invalid credentials");
    }
    console.log("passwordHash:", password);

    const isValidPassword = await bcrypt.compare(
      password,
      isValidUser.password
    );
    if (!isValidPassword) {
      return res.status(401).send("invalid credentials");
    }
    const token = await jwt.sign({ _id: isValidUser._id }, "DEV@123", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.status(200).send("login successful");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});

//  send connection request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending connection request");
  res.send(user.firstName + " sent the connection request!");
});
