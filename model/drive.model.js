const { Schema, model } = require("mongoose");
const drive = new Schema(
  {
    driveId: {
      type: String,
      required: true,
    },
    driveName: {
      type: String,
      required: true,
    },
    driveLocation: {
      type: String,
      required: true,
    },
    driveDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("drives", drive);
