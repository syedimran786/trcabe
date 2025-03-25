const { Schema, model } = require("mongoose");
//! for front end
const feedback = new Schema(
  {
    feedbackId: {
      type: String,
      required: true,
    },
    candidateId: {
      type: String,
      required: true,
    },
    roundType: {
      type: String,
      required: true,
      enum: ["Screening", "Technical", "Managerial", "HR"],
    },
    takenBy: {
      type: String,
      required: true,
    },
    detailedFeedback: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
    },
    theoreticalKnowledge: {
      type: String,
    },
    practicalKnowledge: {
      type: String,
    },
    groomable: {
      type: String,
      enum: ["YES", "NO"],
    },
    learningAbility: {
      type: String,
      enum: ["YES", "NO"],
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SELECTED", "REJECTED"],
      required: true,
    },
  },
  { timestamps: true }
);
//! for front end

//! for walkin
// const feedback = new Schema(
//   {
//     feedbackId: {
//       type: String,
//       required: true,
//     },
//     candidateId: {
//       type: String,
//       required: true,
//     },
//     roundType: {
//       type: String,
//       // required: true,
//       // enum: ["Introductory", "HR", "Technical", "Managerial"],
//     },
//     takenBy: {
//       type: String,
//       // required: true,
//     },
//     // detailedFeedback: {
//     //   type: String,
//     //   required: true,
//     // },
//     // techStack: {
//     //   type: String,
//     // },
//     // theoreticalKnowledge: {
//     //   type: String,
//     // },
//     // practicalKnowledge: {
//     //   type: String,
//     // },
//     // groomable: {
//     //   type: String,
//     //   enum: ["YES", "NO"],
//     // },
//     // learningAbility: {
//     //   type: String,
//     //   enum: ["YES", "NO"],
//     // },
//     // createdBy: {
//     //   type: String,
//     //   required: true,
//     // },
//     status: {
//       type: String,
//       // enum: ["SELECTED", "REJECTED"],
//       // required: true,
//     },
//   },
//   { timestamps: true }
// );

//! for walkin

module.exports = model("feedback", feedback);
