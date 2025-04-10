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
    },
    img: {
      type: String,
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
export { itemSchema };
export type { IItem };
