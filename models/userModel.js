const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email id already exist"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userScheme);

module.exports = User
