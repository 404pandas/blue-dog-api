import db from "../config/db.js";
import models from "../models/index.js";
import cleanDB from "./cleanDB.js";

const { User, Character, Episode, Book, Location, Item, Short } = models;

import userSeeds from "./userSeeds.json" assert { type: "json" };
import characterSeeds from "./characterSeeds.json" assert { type: "json" };
import episodeSeeds from "./episodeSeeds.json" assert { type: "json" };
import bookSeeds from "./bookSeeds.json" assert { type: "json" };
import locationSeeds from "./locationSeeds.json" assert { type: "json" };
import itemSeeds from "./itemSeeds.json" assert { type: "json" };
import shortsSeeds from "./shortsSeeds.json" assert { type: "json" };

db.once("open", async () => {
  try {
    // Deletes Users
    await cleanDB("User", "users");
    console.log("Users deleted");
    // Deletes Characters
    await cleanDB("Character", "characters");
    console.log("Characters deleted");
    // Deletes Episodes
    await cleanDB("Episode", "episodes");
    console.log("Episodes deleted");
    // Deletes Books
    await cleanDB("Book", "books");
    console.log("Books deleted");
    // Deletes Shorts
    await cleanDB("Short", "shorts");
    console.log("Shorts deleted");
    // Deletes Items
    await cleanDB("Item", "items");
    console.log("Items deleted");
    // Deletes Locations
    await cleanDB("Location", "locations");
    console.log("Locations deleted");
    // Creates Users
    for (const user of userSeeds) {
      const newUser = new User(user);
      await newUser.save(); // will trigger password hashing
    }
    console.log("Users seeded!");
    // Creates Characters
    await Character.insertMany(characterSeeds);
    console.log("Characters seeded!");
    // Creates Episodes
    await Episode.insertMany(episodeSeeds);
    console.log("Episodes seeded!");
    // Creates Books
    await Book.insertMany(bookSeeds);
    console.log("Books seeded!");
    // Creates Shorts
    await Short.insertMany(shortsSeeds);
    console.log("Shorts seeded!");
    // Creates Items
    await Item.insertMany(itemSeeds);
    console.log("Items seeded!");
    // Creates Locations
    await Location.insertMany(locationSeeds);
    console.log("Locations seeded!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("El fin");
  process.exit(0);
});
