const mongoose = require("mongoose");

const { Schema } = mongoose;

const episodeSchema = new Schema({
  episodeName: {
    type: String,
    required: [true, "Please add a Episode Name."],
  },
  description: {
    type: String,
    required: [true, "Please add a description."],
  },
  season: {
    type: Number,
    required: [true, "Please add a season."],
  },
  episode: {
    type: Number,
    required: [true, "Please add an episode."],
  },
});
const Episode = mongoose.model("Episode", episodeSchema);

module.exports = Episode;
