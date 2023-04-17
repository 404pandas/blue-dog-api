// import express
const express = require("express");

// import router
const charRouter = express.Router();

// Protect middleware function
const { protect } = require("../middleware/authMiddleware");

// import controller
const {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characterController");

// Routes
charRouter
  .route("/")
  .get(protect, getCharacters)
  .post(protect, createCharacter);
charRouter
  .route("/:id")
  .delete(protect, deleteCharacter)
  .put(protect, updateCharacter);

// Export
module.exports = charRouter;
