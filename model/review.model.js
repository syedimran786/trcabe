const { Schema, model } = require("mongoose");

const review = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required:true,
      },
      stream: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required:true,
    },
    feedback: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);


module.exports = model("review", review);