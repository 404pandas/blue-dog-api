// import express
const express = require("express");

// import router
const greetRouter = express.Router();

// Protect middleware function
const { protect } = require("../middleware/authMiddleware");

// import controller
const {
  getGreetings,
  createGreeting,
  updateGreeting,
  deleteGreeting,
} = require("../controllers/greetController");

// Routes
greetRouter
  .route("/")
  .get(protect, getGreetings)
  .post(protect, createGreeting)
  .delete(protect, deleteGreeting)
  .put(protect, updateGreeting);

// export
module.exports = greetRouter;
