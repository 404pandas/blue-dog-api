const asyncHandler = require("express-async-handler");

// Get all greeting
// GET /api/greeting
// Private
const getGreetings = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get greetings" });
});

// Create greeting
// POST /api/greeting
// Private
const createGreeting = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create greeting" });
});

// Update greeting
// PUT /api/greeting/:id
// Private
const updateGreeting = asyncHandler(
  (async = (req, res) => {
    res.status(200).json({ message: `update greeting ${req.params.id}` });
  })
);

// Delete greeting
// DELETE /api/greeting/:id
// Private
const deleteGreeting = asyncHandler(
  (async = (req, res) => {
    res.status(200).json({ message: `delete greeting ${req.params.id}` });
  })
);

module.exports = {
  getGreetings,
  createGreeting,
  updateGreeting,
  deleteGreeting,
};
