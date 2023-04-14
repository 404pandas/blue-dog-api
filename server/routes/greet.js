// import express
const express = require("express");

// import router
const greetRouter = express.Router();

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
  .get(getGreetings)
  .post(createGreeting)
  .delete(deleteGreeting)
  .put(updateGreeting);

// export
module.exports = greetRouter;
