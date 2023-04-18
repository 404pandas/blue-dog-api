// JWT
const jwt = require("jsonwebtoken");
// Bcrypt
const bcrypt = require("bcryptjs");
// Express Async Handler
const asyncHandler = require("express-async-handler");

// User Model
const User = require("../models/userModel");

// Generate token
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register new user
// POST /api/users
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({
    $or: [{ _id: user.id }, { email: body.email }],
  });

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
const getMe = asyncHandler(async ({ user = null, params }, res) => {
  const foundUser = await User.findOne({
    $or: [
      { _id: user ? user._id : params.id },
      { name: user ? user.name : params.name },
      { email: user ? user._id : params.email },
      { token: user ? user._id : generateJWT(user._id) },
    ],
  });

  if (!foundUser) {
    return res
      .status(400)
      .json({ message: "Cannot find a user with this id!" });
  }

  res.json(foundUser);

  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

// Delete character
// DELETE /api/character/:id
// Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await UserData.findByID(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check for user existing
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //  Prevents user updating character
  // If current user isn't equal to the user id, throws error
  if (user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await global.remove();

  res.status(200).json({ message: `delete user ${req.params.id}` });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  generateJWT,
  deleteUser,
};
