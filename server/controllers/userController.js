// JWT
const jwt = require("jsonwebtoken");
// Bcrypt
const bcrypt = require("bcryptjs");
// Express Async Handler
const asyncHandler = require("express-async-handler");

// Register new user
// POST /api/users
// Public
const loginUser = asyncHandler(async (req, res) => {
  req.json({ message: "Please register user" });
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
// Public
const getMe = asyncHandler(async (req, res) => {
  req.json({ message: "Please register user" });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
