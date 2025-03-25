const { Schema, model } = require("mongoose");
const company = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("company", company);
