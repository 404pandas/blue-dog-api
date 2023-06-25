const db = require("../config/db.js");
const { User, Character, Episode } = require("../models");
const userSeeds = require("./userSeeds.json");
const characterSeeds = require("./characterSeeds.json");
const episodeSeeds = require("./episodeSeeds.json");

db.once("open", async () => {
  try {
    // Deletes Users
    await User.deleteMany({});
    console.log("Users deleted");
    // Deletes Characters
    await Character.deleteMany({});
    console.log("Characters deleted");
    // Deletes Episodes
    await Episode.deleteMany({});
    console.log("Episodes deleted");
    // Deletes Episodes
    await Episode.deleteMany({});
    console.log("Episodes deleted");
    // Creates Users
    await User.create(userSeeds);
    console.log("Users seeded!");
    // Creates Characters
    await Character.create(characterSeeds);
    console.log("Characters seeded!");
    // Creates Episodes
    await Episode.create(episodeSeeds);
    console.log("Episodes seeded!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("El fin");
  process.exit(0);
});
