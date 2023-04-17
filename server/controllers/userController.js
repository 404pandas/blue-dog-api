// JWT
const jwt = require("jsonwebtoken");
// Bcrypt
const bcrypt = require("bcryptjs");
// Express Async Handler
const asyncHandler = require("express-async-handler");

// User Model
const User = require("../models/userModel");

// Register new user
// POST /api/users
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  //   Compares entered and stored password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
    // 400 error catch
  } else {
    res.status(400);
    throw new Error(
      "Invalid credentials. If you need help, please ask your paren"
    );
  }
  //   message for successful login
  req.json({ message: `Logged in user: ${user.name}` });
});

// Authenticate a user
// POST /api/users/login
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Handler if fields aren't filled out
  if (!name || !email || !password) {
    res.status(400);
    throw new Error(
      "Please fill out all fields. If you need help, please ask your parent!"
    );
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(
      "User already exists! If you need help, please ask your parent!"
    );
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status[201].json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error(
      "Invalid user data. If you need help, please ask your parent!"
    );
  }
});

// Get user data
// GET /api/users/me
// Private- JWT
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// Generate token
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
