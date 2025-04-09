import mongoose, { Document, Schema, Model } from "mongoose";

// Define a TypeScript interface for the book document
interface IBook extends Document {
  bookName: string;
  img?: string;
  characters?: string;
  plot?: string;
  publisher?: string;
  publish_date?: string;
  pages?: string;
  isbn?: string;
  trivia?: string;
}

// Define the schema
const bookSchema: Schema<IBook> = new Schema(
  {
    bookName: {
      type: String,
      required: [true, "Please add a Book Name."],
    },
    img: String,
    characters: String,
    plot: String,
    publisher: String,
    publish_date: String,
    pages: String,
    isbn: String,
    trivia: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create the model
const Book: Model<IBook> = mongoose.model<IBook>("Book", bookSchema);

export default Book;
