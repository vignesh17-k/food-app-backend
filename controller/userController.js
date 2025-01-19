const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    return res.status(400).json({
      message: "Email already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    return res.status(201).json({
      data: {
        username: username,
        email: email,
      },
      message: "Registed user successfully",
    });
  } catch {
    return res.status(400).json({
      message: "Registed user failed",
    });
  }
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });
  const validatedPassword = await bcrypt.compare(password, user?.password);

  if (user && validatedPassword) {
    const token = jwt.sign(
      {
        user: {
          username: user?.username,
          password: password,
          email: user?.email,
          id: user?.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1h" }
    );
    return res?.status(200).json({
      token: token,
      message: "loggedIn succesfully",
    });
  } else {
    return res.status(400).json({
      message: "login user failed",
    });
  }
});

const getUser = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      data: users,
      message: "Fetched all users",
    });
  } catch {
    return res.status(400).json({
      message: "Bad request",
    });
  }
});

module.exports = { registerUser, loginUser, getUser };
