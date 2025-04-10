const { Schema, model } = require("mongoose");

const batch = new Schema(
  {
    course: {
      type: String,
      required: true,
    },
    trainer: {
        type: String,
        required:true,
      },
    contact: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required:true,
    //   "12/11/1981"
    },
    time: {
      type: String,
      required:true,
    },
    duration: {
        type: String,
        required:true,
      },
    mode: {
    type: String,
    required:true,
    }
  },
  { timestamps: true }
);


module.exports = model("batch", batch);