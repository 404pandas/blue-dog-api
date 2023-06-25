const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({
  locationName: {
    type: String,
    required: [true, "Please add a Location Name."],
  },
  description: {
    type: String,
    required: [true, "Please add a description."],
  },
  rooms: {
    type: String,
  },
  appearances: {
    type: String,
    required: [true, "Please add a season."],
  },
  inhabitants: {
    type: String,
    required: [true, "Please add an location."],
  },
  inconsistencies: {
    type: String,
  },
  trivia: {
    type: String,
  },
  gallery: {
    type: String,
    required: [true, "Please add an location."],
  },
});
const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
