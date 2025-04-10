import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for an Episode document
interface IEpisode extends Document {
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
    },
    description: {
      type: String,
    },
    season: {
      type: Number,
    },
    episode: {
      type: Number,
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
export { episodeSchema };
export type { IEpisode };
