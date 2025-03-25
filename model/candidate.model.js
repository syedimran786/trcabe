const { Schema, model } = require("mongoose");

//! for frontend
const candidate = new Schema(
  {
    candidateId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email:  {
      type: String,
      required: true,
  },
  mobileNumber: {
      type: String,
      required: true
    },
    alternativeNumber: {
      type: String,
    },
    yearsOfExp: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true
    },
    panIndia: {
      type: String,
      required: true
    },
    ugEducationDetail: {
          type: String,
          required: true
        },
        ugStream: {
          type: String,
          required: true
        },
        ugPassOutYear: {
          type: String,
          required: true
        },
        ugAggregate: {
          type: String,
          required: true
        },
        pgEducationDetail: {
          type: String,
        },
        pgStream: {
          type: String,
        },
        pgPassOutYear: {
          type: String,
        },
        pgAggregate: {
          type: String,
        },
        skills: {
          type: String,
          required: true
        },
        // hashedOTP: {
        //   type: String,
        //   required: true,
        // },
        verified: {
          type: Boolean,
          required: true,
          default: true,
        },
        overallStatus: {
          type: String,
          enum: ["SELECTED", "REJECTED"],
        },
        remarks: {
          type: String,
        },
        remarkesGivenBy: {
          type: String,
        },
        createdBy: {
          type: String,
          required: true,
        },
        createdFrom: {
          type: String,
          required:true
        },
        driveName: {
                  type: String,
                },
        onBoard:{
          type: Boolean,
          default: false,
        }
      },
      { timestamps: true }
      
); 

//! for frontend

//! for walkins
// const candidate = new Schema(
//   {
//     candidateId: {
//       type: String,
//       required: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//     },
//     email:  {
//       type: String,
//       required: true,
//       unique: true
      
//   },
//   mobileNumber: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     alternativeNumber: {
//       type: String,
//     },
//     yearsOfExp: {
//       type: String,
    
//     },
//     source: {
//       type: String,
//       required: true
//     },
//     panIndia: {
//       type: String,
//       required: true
//     },
//     ugEducationDetail: {
//           type: String,
         
//         },
//         ugStream: {
//           type: String,
          
//         },
//         ugPassOutYear: {
//           type: String,
         
//         },
//         ugAggregate: {
//           type: String,
          
//         },
//         pgEducationDetail: {
//           type: String,
//         },
//         pgStream: {
//           type: String,
//         },
//         pgPassOutYear: {
//           type: String,
//         },
//         pgAggregate: {
//           type: String,
//         },
//         skills: {
//           type: String,
//           required: true
//         },
//         // hashedOTP: {
//         //   type: String,
//         //   required: true,
//         // },
//         verified: {
//           type: Boolean,
//           required: true,
//           default: false,
//         },
//         overallStatus: {
//           type: String,
//           enum: ["SELECTED", "REJECTED"],
//         },
//         remarks: {
//           type: String,
//         },
//         remarkesGivenBy: {
//           type: String,
//         },
//         createdBy: {
//           type: String,
//           required: true,
//         },
//         createdFrom: {
//           type: String,
//           required:true
//         },
//         driveName: {
//                   type: String,
//                 },
//       },
  // onBoard:{
  //   type: Boolean,
  //   default: false,
  // }
//       { timestamps: true }
      
// );
//! for walkins

// const candidate = new Schema(
//   {
//     candidateId: {
//       type: String,
//       required: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//     },
//     emailId: {
//       type: String,
//       required: true,
//     },
//     contactNumber: {
//       type: String,
//       required: true,
//     },
//     alternativeNumber: {
//       type: String,
//       required: true,
//     },
//     yearOfExp: {
//       type: String,
//       required: true,
//     },
//     source: {
//       type: String,
//       required: true
//     },
//     panIndia: {
//       type: String,
//       required: true
//     },
//     educationDetails: 
//       {
//         ugEducationDetails: {
//           type: String,
//         },
//         ugStream: {
//           type: String,
//         },
//         ugPassOutYear: {
//           type: String,
//         },
//         ugAggregate: {
//           type: String,
//         },
//         pgEducationDetails: {
//           type: String,
//         },
//         pgStream: {
//           type: String,
//         },
//         pgPassOutYear: {
//           type: String,
//         },
//         pgAggregate: {
//           type: String,
//         }
//       },
    
//     experienceDetails: [
//       {
//         companyName: {
//           type: String,
//         },
//         joinedOn: {
//           type: String,
//         },
//         complition: {
//           type: String,
//         },
//         role: {
//           type: String,
//         },
//       },
//     ],
//     hashedOTP: {
//       type: String,
//       required: true,
//     },
//     verified: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     overallStatus: {
//       type: String,
//       enum: ["SELECTED", "REJECTED"],
//     },
//     remarks: {
//       type: String,
//     },
//     remarkesGivenBy: {
//       type: String,
//     },
//     createdBy: {
//       type: String,
//       required: true,
//     },
//     driveDetails: {
//       driveId: {
//         type: String,
//         required: true,
//       },
//       driveName: {
//         type: String,
//         required: true,
//       },
//       driveLocation: {
//         type: String,
//         required: true,
//       },
//       driveDate: {
//         type: String,
//         required: true,
//       },
//     },
//   },
//   { timestamps: true }
// );

module.exports = model("candidate", candidate);


// const { Schema, model } = require("mongoose");

// const candidate = new Schema(
//   {
//     candidateId: {
//       type: String,
//       required: true,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     middleName: {
//       type: String,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     dob: {
//       type: String,
//       required: true,
//     },
//     age: {
//       type: String,
//       required: true,
//     },
//     passOutYear: {
//       type: String,
//       required: true,
//     },
//     highestQualification: {
//       type: String,
//       required: true,
//     },
//     mobileNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     source: {
//       type: String,
//       required: true,
//       enum: ["Jspiders / Qspiders", "Market Candidate"],
//     },
//     branchName: {
//       type: String,
//     },
//     other: {
//       type: String,
//     },
//     educationDetails: [
//       {
//         educationType: {
//           type: String,
//         },
//         collegeName: {
//           type: String,
//         },
//         qualification: {
//           type: String,
//         },
//         marks: {
//           type: String,
//         },
//       },
//     ],
//     experienceDetails: [
//       {
//         companyName: {
//           type: String,
//         },
//         joinedOn: {
//           type: String,
//         },
//         complition: {
//           type: String,
//         },
//         role: {
//           type: String,
//         },
//       },
//     ],
//     hashedOTP: {
//       type: String,
//       required: true,
//     },
//     verified: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     overallStatus: {
//       type: String,
//       enum: ["SELECTED", "REJECTED"],
//     },
//     remarks: {
//       type: String,
//     },
//     remarkesGivenBy: {
//       type: String,
//     },
//     createdBy: {
//       type: String,
//       required: true,
//     },
//     driveDetails: {
//       driveId: {
//         type: String,
//         required: true,
//       },
//       driveName: {
//         type: String,
//         required: true,
//       },
//       driveLocation: {
//         type: String,
//         required: true,
//       },
//       driveDate: {
//         type: String,
//         required: true,
//       },
//     },
//   },
//   { timestamps: true }
// );

// module.exports = model("candidate", candidate);
