// --------------- Imports --------------- //
// Global
// Path
const path = require("path");

// Third Party
// Express
const express = require("express");
// Session
const session = require("express-session");
// CORS
const cors = require("cors");
// Colors
const colors = require("colors");
// Dotenv for environmental variables
const dotenv = require("dotenv");
// Handlebars
const exphbs = require("express-handlebars");
// MongoStore
const MongoStore = require("connect-mongo");

// Local
// Database
const connectDB = require("./server/config/db");
// Configs
dotenv.config({ path: "./config/config.env" });
// Routes
const charRouter = require("./server/routes/characterRoutes");
const greetExample = require("./server/routes/greetExample");
const userRouter = require("./server/routes/userRoutes");
const { errorHandler } = require("./server/middleware/errorMiddleware");
const { authHandler } = require("./server/middleware/authMiddleware");
const fb = require("./server/routes/feedback");
// Initialize express
const app = express();

// Port
const PORT = process.env.PORT || 5200;

// Function to connect to Mongo DB
connectDB();

// Handlebar Helpers
const hbs = exphbs.create({ helpers });

// Sessions
const sess = session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
});

app.use(session(sess));

// Handlebars Helpers
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("./server/helpers/fsUtils");
const { getRandomValue } = require("./server/helpers/uuid");
const {
  format_time,
  format_date,
  get_random,
} = require("./server/helpers/helpers");

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      readFromFile,
      writeToFile,
      readAndAppend,
      getRandomValue,
      format_time,
      format_date,
      get_random,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "handlebars");

// Folders to be served
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client")));
app.use(cors());

// Routes
app.use("/feedback", fb);
app.use("/characters", charRouter);
app.use("/user", userRouter);
app.use("/greet", greetExample);
app.use(errorHandler);
app.use(authHandler);

app.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);
