// Imports
import express from "express";
import cors from "cors";

// Requires
var greet = require("./routes/greet");

// Create express app
const app = express();

// Middleware so server recognizes incoming requests as JSON
app.use(express.json());

// Makes API publicly accessible
app.use(cors());

// Routes
app.use("/greet", greet);

// Get root
app.get("/", (req, res) => {
  res.json("G'day Mate!");
});

// Listen for connection + console log port
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Windows: Listening on: http://localhost:${port}`);
  console.log(`Mac: Listening on: http://127.0.0.1:${port}`);
});
