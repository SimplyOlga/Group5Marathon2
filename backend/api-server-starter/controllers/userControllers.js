const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const mongoose = require("mongoose");

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};


const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, address } = req.body;

  try {
    const user = await User.signup(name, email, password, phone_number, gender, date_of_birth, address);

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }


    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password is too weak" });
    }

    // create a token
    const token = generateToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    if (user) {
      // create a token
      const name = user.name;
      const phone_number = user.phone_number;
      const gender = user.gender;
      const date_of_birth = user.date_of_birth;
      const address = user.address;
      const token = generateToken(user._id);
      res.status(200).json({ name, email, phone_number, gender, date_of_birth, address, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user
    const userObject = await User.findById(user._id);
    res.status(200).json(userObject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
};

