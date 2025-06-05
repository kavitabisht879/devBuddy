//  in front end part use redux toolkit for state and rtk query for api data for this application
//  -20:00
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validaeSignupData } = require("./utills/validation");
const bcrypt = require("bcrypt");
const user = require("./models/user");

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

    const isValidPassword = await bcrypt.compare(password ,user.password)
    if(!isValidPassword){
      return res.status(401).send("invalid credentials")
    }
    res.status(200).send("login successful");

  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//  get user by email_id

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not Found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//  get all user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const user= await User.findByIdAndDelete({_id:userId})
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data.skills && data.skills.length > 10) {
      throw new Error("Too many skills (max 10)");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send(`Update failed: ${error.message}`);
  }
});
