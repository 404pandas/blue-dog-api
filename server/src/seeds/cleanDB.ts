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
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};
