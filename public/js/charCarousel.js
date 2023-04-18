// Schema
const charSchemaBase = require("../../server/schemas/character.json");

// Mongoose
const mongoose = require("mongoose");

// Create schema
const charSchema = mongoose.Schema({
  text: {
    bsonType: Object,
    title: Character,
    required: [
      characterName,
      description1,
      appearance,
      personality,
      characteristics,
      traits,
      firstAppearance,
      appearances,
      absences,
    ],
    properties: {
      characterName: String,
      description1: String,
      decription2: String,
      catchphrase: String,
      appearance: String,
      personality: String,
      nicknames: Array,
      characteristics: Object,
      traits: Object,
      personal_status: Object,
      firstAppearance: String,
      trivia: Array,
      appearances: Array,
      absences: Array,
      gallery: Array,
      animated: Array,
      references: Array,
    },
  },
});
