const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  deleteUser,
} = require("../controllers/userController");

// Protect middleware function
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get("/me", protect, getMe)
  .post("/login", protect, loginUser)
  .post("/", registerUser);
router.route("/:id").delete(protect, deleteUser).put(protect, updateUser);

module.exports = userRouter;
