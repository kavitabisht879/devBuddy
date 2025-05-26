//  in front end part use redux toolkit  for this application
// -57

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
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
  // creating a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added sucessfully...");
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
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

app.patch("/user" , async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body
  try {
    const user = await User.findByIdAndUpdate(userId,data)
    console.log(user);
    res.send("user updated successfully")
  } catch (error) {
    res.status(400).send("something went wrong ")
  }
})