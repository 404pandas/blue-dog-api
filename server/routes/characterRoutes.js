// import express
const express = require("express");

// import router
const charRouter = express.Router();

// import controller
const {
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require("../controllers/characterController");

// Routes
charRouter.route("/").get(getCharacters).post(createCharacter);
charRouter.route("/:id").delete(deleteCharacter).put(updateCharacter);

// Export
module.exports = charRouter;
