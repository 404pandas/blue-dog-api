import mongoose, { Document, Schema, Model } from "mongoose";

// TypeScript interface for Location document
export interface ILocation extends Document {
  locationName: string;
  description: string;
  appearance?: string;
  rooms?: string;
  appearances?: string;
  inhabitants?: string;
  inconsistencies?: string;
  trivia?: string;
  gallery?: string;
}

// Define the schema
const locationSchema: Schema<ILocation> = new Schema(
  {
    locationName: {
      type: String,
      required: [true, "Please add a Location Name."],
    },
    description: {
      type: String,
      required: [true, "Please add a description."],
    },
    appearance: String,
    rooms: String,
    appearances: String,
    inhabitants: String,
    inconsistencies: String,
    trivia: String,
    gallery: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create the model
const Location: Model<ILocation> =
  mongoose.model < ILocation > ("Location", locationSchema);

export default Location;
