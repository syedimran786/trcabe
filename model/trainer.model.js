const { Schema, model } = require("mongoose");

const trainer = new Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    name: {
        type: String,
        required:true,
      },
      email:{
        type: String,
        required:true,
      },
      mobile:{
        type: String,
        required:true,
      },
      designation: {
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);


module.exports = model("trainer", trainer);