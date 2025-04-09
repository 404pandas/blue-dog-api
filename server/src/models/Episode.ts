import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for an Episode document
export interface IEpisode extends Document {
  episodeName: string;
  description: string;
  season: number;
  episode: number;
}

// Define the schema
const episodeSchema: Schema<IEpisode> = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create the model
const Episode: Model<IEpisode> = mongoose.model<IEpisode>(
  "Episode",
  episodeSchema
);

export default Episode;
