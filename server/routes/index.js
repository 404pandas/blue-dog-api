const express = require("express");

// Import our modular routers for /tips and /feedback
const charRouter = require("./characterRoutes");
const feedbackRouter = require("./feedback");
const greetRouter = require("./greetExample");
const userRouter = require("./userRouter");

const app = express();

app.use("/character", charRouter);
app.use("/feedback", feedbackRouter);
app.use("/greet", greetRouter);
app.use("/user", userRouter);

module.exports = app;
