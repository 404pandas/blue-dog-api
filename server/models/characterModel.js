const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    characterName: {
      type: String,
      required: [
        true,
        "Please add a Character Name. If you need assistance, ask a parent!",
      ],
      ref: "",
    },
    description1: {
      type: String,
      required: [
        true,
        "Please add a description. If you need assistance, ask a parent!",
      ],
      ref: "",
    },
    decription2: {
      type: String,
      ref: "",
    },
    catchphrase: {
      type: String,
      ref: "",
    },
    appearance: {
      type: String,
      required: [
        true,
        "Please add an appearance. If you need assistance, ask a parent!",
      ],
      ref: "",
    },
    personality: {
      type: String,
      ref: "",
    },
    nicknames: {
      type: Array,
      ref: "",
    },
    characteristics: {
      type: Object,
      ref: "",
    },
    traits: {
      type: Object,
      ref: "",
    },
    personal_status: {
      type: Object,
      ref: "",
    },
    firstAppearance: {
      type: String,
      ref: "",
    },
    trivia: {
      type: Array,
      ref: "",
    },
    absences: {
      type: Array,
      required: [
        true,
        "Please add the episodes a character isn't in. If you need assistance, ask a parent!",
      ],
      ref: "",
    },
    gallery: {
      type: Array,
      ref: "",
    },
    animated: {
      type: Array,
      ref: "",
    },
    references: {
      type: Array,
      ref: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Character", characterSchema);