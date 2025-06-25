const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a valid email address");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  validateSignupData,
};
