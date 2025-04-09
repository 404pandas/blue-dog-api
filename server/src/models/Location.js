const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    locationName: {
      type: String,
      required: [true, "Please add a Location Name."],
    },
    description: {
      type: String,
      required: [true, "Please add a description."],
    },
    appearance: {
      type: String,
    },
    rooms: {
      type: String,
    },
    appearances: {
      type: String,
    },
    inhabitants: {
      type: String,
    },
    inconsistencies: {
      type: String,
    },
    trivia: {
      type: String,
    },
    gallery: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
