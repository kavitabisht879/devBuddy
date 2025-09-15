//  in front end part use redux toolkit for state and rtk query for api data for this application

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const { requestRouter } = require("./routes/request");
const { profileRouter } = require("./routes/profile");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
app.use(express.json());
app.use(cookieParser());

const port = 7003;

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
connectDB();

const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

server.on("error", (err) => {
  console.error("Server failed to start:", err.message);
});
