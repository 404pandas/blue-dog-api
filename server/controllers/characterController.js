// Get all characters
// GET /api/characters
// Private
const getCharacters = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: "get characters" });
};

// Create character
// POST /api/characters
// Private
const createCharacter = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: "Create character" });
};

// Update Character
// PUT /api/character/:id
// Private
const updateCharacter = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: `update character ${req.params.id}` });
};

// Delete character
// DELETE /api/character/:id
// Private
const deleteCharacter = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: `delete character ${req.params.id}` });
};

module.exports = {
  updateCharacter,
  deleteCharacter,
  createCharacter,
  getCharacters,
};