const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

// Protect middleware function
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getCharacters).post(protect, createCharacter);
router
  .route("/:id")
  .delete(protect, deleteCharacter)
  .put(protect, updateCharacter);

module.exports = userRouter;
