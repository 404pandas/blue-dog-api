// --------------- Imports --------------- //
// Path
const path = require("path");
// Express
const express = require("express");
// CORS
const cors = require("cors");
// Colors
const colors = require("colors");
// Dotenv for environmental variables
const dotenv = require("dotenv");
// Database
const connectDB = require("./server/config/db");
// Handlebars
const exphbs = require("express-handlebars");
// MongoStore
const MongoStore = require("connect-mongo");

// Configs
dotenv.config({ path: "./config/config.env" });

// Routes
const charRouter = require("./server/routes/characterRoutes");
const greetRouter = require("./server/routes/greet");
const userRouter = require("./server/routes/userRoutes");

const { errorHandler } = require("./server/middleware/errorMiddleware");

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

// Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Routes
app.use("/api/characters", charRouter);
api.use("/api/user", userRouter);
app.use("/greet, greet", greetRouter);

app.use(errorHandler);

// Handlebars Helpers
const {} = require("./helpers/hbs");

// Handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: {},
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Sessions
app.use(
  session({
    secret: "heeler family",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);
