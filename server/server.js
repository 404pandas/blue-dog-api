// Express
const express = require("express");
// CORS
const cors = require("cors");
// Colors
const colors = require("colors");
// Dotenv for environmental variables
const dotenv = require("dotenv").config();
// Database
const connectDB = require("./config/db");

// Routes
const charRouter = require("./routes/characterRoutes");
const greetRouter = require("./routes/greet");

const { errorHandler } = require("./middleware/errorMiddleware");

// Port
const port = process.env.PORT || 5200;

// Function to connect to Mongo DB
connectDB();

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Entry
app.get("/", (req, res) => {
  res.json(`Welcome to the API, ${user}`);
});

// Routes
app.use("/api/characters", charRouter);
api.use("/api/user", userRouter);
app.use("/greet, greet", greetRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);
