const mongoose = require("mongoose");

const { Schema } = mongoose;

const propSchema = new Schema({
  propName: {
    type: String,
    required: [true, "Please add a Prop Name."],
  },
  img: {
    type: String,
    required: [true, "Please add an image file path."],
  },
});

const Prop = mongoose.model("Prop", propSchema);

module.exports = Prop;
