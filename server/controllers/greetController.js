// Get all greeting
// GET /api/greeting
// Private
const getGreetings = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: "get greetings" });
};

// Create greeting
// POST /api/greeting
// Private
const createGreeting = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: "Create greeting" });
};

// Update greeting
// PUT /api/greeting/:id
// Private
const updateGreeting = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: `update greeting ${req.params.id}` });
};

// Delete greeting
// DELETE /api/greeting/:id
// Private
const deleteGreeting = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  res.status(200).json({ message: `delete greeting ${req.params.id}` });
};

module.exports = {
  getGreetings,
  createGreeting,
  updateGreeting,
  deleteGreeting,
};
