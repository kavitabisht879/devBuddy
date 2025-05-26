const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 58,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
    min: 18,
  },
  gender: {
    type: String,
  },
  photoUrl: {
    type: String,
    default: "dummy_url",
  },
  about: {
    type: String,
    default: "i am default about the user",
  },
  skills:{
    type:[String]
  }
});

module.exports = mongoose.model("User", userSchema);
