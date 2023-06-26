const mongoose = require("mongoose");

const { Schema } = mongoose;

const shortSchema = new Schema(
  {
    shortName: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    characters: {
      type: String,
    },
    trivia: {
      type: String,
    },
    url: {
      type: String,
    },
    premiereDate: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Short = mongoose.model("Short", shortSchema);

module.exports = Short;
