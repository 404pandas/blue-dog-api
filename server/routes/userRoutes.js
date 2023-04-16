const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", getMe);

module.exports = userRouter;
