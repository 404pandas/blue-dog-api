import models from "../models/index.js";
import db from "../config/db.js";

export default async (
  modelName:
    | "User"
    | "Character"
    | "Episode"
    | "Book"
    | "Short"
    | "Item"
    | "Location",
  collectionName: string
) => {
  try {
    const model = models[modelName];

    // Check if model exists before accessing properties
    if (model?.db?.db) {
      let modelExists = await model.db.db
        .listCollections({
          name: collectionName,
        })
        .toArray();

      if (modelExists.length) {
        await db.dropCollection(collectionName);
      }
    } else {
      throw new Error(`Model ${modelName} not found.`);
    }
  } catch (err) {
    throw err;
  }
};
