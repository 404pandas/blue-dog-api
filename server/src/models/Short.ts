import mongoose, { Document, Schema, Model } from "mongoose";

// TypeScript interface for Short document
interface IShort extends Document {
  shortName: string;
  plot: string;
  characters?: string;
  trivia?: string;
  url?: string;
  premiereDate?: string;
}

// Define the schema
const shortSchema: Schema<IShort> = new Schema(
  {
    shortName: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    characters: String,
    trivia: String,
    url: String,
    premiereDate: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create the model
const Short: Model<IShort> = mongoose.model<IShort>("Short", shortSchema);

export default Short;
