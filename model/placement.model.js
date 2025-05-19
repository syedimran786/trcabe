const { Schema, model } = require("mongoose");

const placement = new Schema(
  {
    name: {
      type: String,
      required:true,
    },
    email:{
      type:String,
      required:true
    },
    mobile:{
      type:String,
      required:true
    },
    photo: {
      type: String,
      required: true,
    },
      designation: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required:true,
    }
  },
  { timestamps: true }
);


module.exports = model("placement", placement);