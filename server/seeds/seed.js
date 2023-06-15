const db = require("../config/db.js");
const { User, Character } = require("../models");
const userSeeds = require("./userSeeds.json");
const characterSeeds = require("./characterSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    console.log("Users deleted");
    await Character.deleteMany({});
    console.log("Characters deleted");
    // Creates Users
    await User.create(userSeeds);
    console.log("Users seeded!");
    // Creates Characters
    await Character.create(characterSeeds);
    console.log("Characters seeded!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("El fin");
  process.exit(0);
});
