//  in front end part use redux toolkit for state and rtk query for api data for this application

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const { requestRouter } = require("./routes/request");
const { profileRouter } = require("./routes/profile");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");

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
app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
