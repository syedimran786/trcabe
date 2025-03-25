const { Schema, model } = require("mongoose");
const utility = require("../helper/utility").encodedString;

// const user = new Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//     },
//     role: {
//       type: String,
//       isRequired: true,
//       enum: ["user", "admin"],
//     },
//   },
//   { timestamps: true }
// );


const user = new Schema(
  {
    fullName: {
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
      // validate: {
      //   validator: email => email.endsWith('testyantra.in') || email.endsWith('testyantra.com'),
      //   message:"Only Testyantra Emails Allowed"
      // }
    },
    role: {
      type: String,
      isRequired: true,
      enum: ["user", "admin"],
    },
    hashedOTP: {
      type: String,
      required: true,
      default:"null"
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
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

module.exports = model("user", user);
