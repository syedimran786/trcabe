//! changes
const { Schema, model } = require("mongoose");

const allCandidates = new Schema(
      {
        candidateId: {
            type: String,
          },
          fullName: {
              type: String,
              required: true,
            },
            emailId: {
                type: String,
                required: true,
              },
      
    
    // candidateId: {
    //   type: String,
    //   required: true,
    // },
    // fullName: {
    //   type: String,
    //   required: true,
    // },
    // emailId: {
    //   type: String,
    //   required: true,
    // },
    // contactNumber: {
    //   type: String,
    //   required: true,
    // },
    // alternativeNumber: {
    //   type: String,
    //   required: true,
    // },
    // yearOfExp: {
    //   type: String,
    //   required: true,
    // },
    // source: {
    //   type: String,
    //   required: true
    // },
    // panIndia: {
    //   type: String,
    //   required: true
    // },
    // // educationDetails: 
    // //   {
    //     ugEducationDetails: {
    //       type: String,
    //     },
    //     ugStream: {
    //       type: String,
    //     },
    //     ugPassOutYear: {
    //       type: String,
    //     },
    //     ugAggregate: {
    //       type: String,
    //     },
    //     pgEducationDetails: {
    //       type: String,
    //     },
    //     pgStream: {
    //       type: String,
    //     },
    //     pgPassOutYear: {
    //       type: String,
    //     },
    //     pgAggregate: {
    //       type: String,
    //     }
    //   },
    
    });

module.exports = model("allCandidates", allCandidates);
