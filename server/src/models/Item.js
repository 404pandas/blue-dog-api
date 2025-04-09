const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema(
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

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
