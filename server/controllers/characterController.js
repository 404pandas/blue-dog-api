// import = asyncHandler(asyncandler
const asyncHandler = require("express-async-handler");

// Import model
const Character = require("../models/characterModels");
const User = require("../models/userModel");

// Get all characters
// GET /api/characters
// Private
const getCharacters = asyncHandler(async (req, res) => {
  const characters = await Character.find({ user: req.user.id });

  res.status(200).json(characters);
});

// Create character
// POST /api/characters
// Private
const createCharacter = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Character not found");
  }

  const character = await Character.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(character);
});

// Update Character
// PUT /api/character/:id
// Private
const updateCharacter = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!character) {
    res.status(400);
    throw new Error("Character not found");
  }

  // Check for user existing
  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Check for goal

  //  Prevents user updating character
  // If current user isn't equal to the user id, throws error
  if (character.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCharacter = await Character.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCharacter);
});

// Delete character
// DELETE /api/character/:id
// Private
const deleteCharacter = asyncHandler(async (req, res) => {
  const character = await CharacterData.findByID(req.params.id);

  if (!character) {
    res.status(400);
    throw new Error("Character not found");
  }

  // Check for user existing
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //  Prevents user updating character
  // If current user isn't equal to the user id, throws error
  if (character.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await global.remove();

  res.status(200).json({ message: `delete character ${req.params.id}` });
});

module.exports = {
  updateCharacter,
  deleteCharacter,
  createCharacter,
  getCharacters,
};
