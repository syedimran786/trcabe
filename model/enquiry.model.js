const { Schema, model } = require("mongoose");

const enquiry = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required:true,

    },
    experience: {
      type: String,
      required: true,
      // enum: ["user", "admin"],
    },
    message:{
        type:String,
        required:true,
        default:"Normal Enquiry"
    },
    re_enquiry: {
      type: String,
      required: true,
      default: "No",
    },
  },
  { timestamps: true }
);
//encrypting password before saving
// user.pre("save", function (next) {
//   var user = this;
//   if (!user.isModified("password")) return next();
//   user.password = utility(user.password);
//   next();
// });

module.exports = model("enquiry", enquiry);