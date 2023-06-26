const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: [true, "Please add a Book Name."],
  },
  img: {
    type: String,
  },
  characters: {
    type: String,
  },
  plot: {
    type: String,
  },
  publisher: {
    type: String,
  },
  publish_date: {
    type: String,
  },
  pages: {
    type: String,
  },
  isbn: {
    type: String,
  },
  trivia: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
