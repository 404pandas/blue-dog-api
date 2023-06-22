const mongoose = require("mongoose");

const { Schema } = mongoose;

const characterSchema = new Schema(
  {
    characterName: {
      type: String,
      required: [
        true,
        "Please add a Character Name. If you need assistance, ask a parent!",
      ],
    },
    description1: {
      type: String,
      required: [
        true,
        "Please add a description. If you need assistance, ask a parent!",
      ],
    },
    description2: {
      type: String,
    },
    catchphrase: {
      type: String,
    },
    appearance: {
      type: String,
      required: [
        true,
        "Please add an appearance. If you need assistance, ask a parent!",
      ],
    },
    personality: {
      type: String,
    },
    nicknames: {
      type: String,
    },
    breed: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    eyes: {
      type: String,
    },
    fur: {
      type: String,
    },

    relatives: {
      type: String,
    },

    friends: {
      type: String,
    },

    firstAppearance: {
      type: String,
    },
    trivia: {
      type: String,
    },
    absences: {
      type: String,
      required: [
        true,
        "Please add the episodes a character isn't in. If you need assistance, ask a parent!",
      ],
    },
    gallery: {
      type: String,
    },
    animated: {
      type: String,
    },
    references: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
