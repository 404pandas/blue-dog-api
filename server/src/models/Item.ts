import mongoose, { Document, Schema, Model } from "mongoose";

// TypeScript interface for Item document
interface IItem extends Document {
  itemName: string;
  img: string;
}

// Define the schema
const itemSchema: Schema<IItem> = new Schema(
  {
    itemName: {
      type: String,
      required: [true, "Please add a Item Name."],
    },
    img: {
      type: String,
      required: [true, "Please add an image file path."],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create the model
const Item: Model<IItem> = mongoose.model<IItem>("Item", itemSchema);

export default Item;
