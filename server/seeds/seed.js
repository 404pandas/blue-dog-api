const db = require("../config/db.js");
const {
  User,
  Character,
  Episode,
  Book,
  Location,
  Prop,
  Short,
} = require("../models");
const userSeeds = require("./userSeeds.json");
const characterSeeds = require("./characterSeeds.json");
const episodeSeeds = require("./episodeSeeds.json");
const bookSeeds = require("./bookSeeds.json");
const locationSeeds = require("./locationSeeds.json");
const propSeeds = require("./propSeeds.json");
const shortsSeeds = require("./shortsSeeds.json");

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
    // Deletes Books
    await Book.deleteMany({});
    console.log("Books deleted");
    // Deletes Shorts
    await Short.deleteMany({});
    console.log("Shorts deleted");
    // Deletes Props
    await Prop.deleteMany({});
    console.log("Props deleted");
    // Deletes Locations
    await Location.deleteMany({});
    console.log("Locations deleted");
    // Creates Users
    await User.create(userSeeds);
    console.log("Users seeded!");
    // Creates Characters
    await Character.create(characterSeeds);
    console.log("Characters seeded!");
    // Creates Episodes
    await Episode.create(episodeSeeds);
    console.log("Episodes seeded!");
    // Creates Books
    await Book.create(bookSeeds);
    console.log("Books seeded!");
    // Creates Shorts
    await Short.create(shortsSeeds);
    console.log("Shorts seeded!");
    // Creates Props
    await Prop.create(propSeeds);
    console.log("Props seeded!");
    // Creates Locations
    await Location.create(locationSeeds);
    console.log("Locations seeded!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("El fin");
  process.exit(0);
});
