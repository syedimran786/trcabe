const Candidate = require("../model/candidate.model");
const Company = require("../model/company.model");
const Drive = require("../model/drive.model");
const Feedback = require("../model/feedback.model");
const { v4: uuidv4 } = require("uuid");
const { createNewOTP, verifyOTP } = require("../helper/otpHelper");
const { sendOTP, candidateMail } = require("../helper/mailHelper");
const Joi = require('joi');
const XLSX = require("xlsx");
const reader = require('xlsx');
const { default: axios } = require("axios");

 //! Joi validation starts for front end
let schema = Joi.object({
  candidateId: Joi.string().required(),
  fullName: Joi.string().max(50).required().pattern(/^[A-Za-z\s\.]+$/).trim().
    messages({
      "string.empty": "Full Name is Required",
      "string.pattern.base": "Full Name Must Contain Alphabets", "string.max": "Full Name must be less than or equal to 30 characters"
    }),

  email: Joi.string().required().email().messages({ "string.email": "Invalid Email" }).trim(),

  mobileNumber: Joi.string().required().min(10).max(10).pattern(/^[6-9][0-9]{9}$/).
    messages({
      "string.empty": "Contact Number is Required", "string.max": "Mobile Number Should Contain Maximum 10 Digits",
      "string.min": "Mobile Number Should Contain Minimun 10 Digits",
      "string.pattern.base": "Invalid Mobile Number"
    }).trim(),

  alternativeNumber: Joi.string().max(10).allow("").allow(null).
    messages({ "string.max": "Only 10 Numbers Allowed", "string.pattern.base": "Invalid Contact Number" }).trim(),

  yearsOfExp: Joi.string().required().messages({ "string.empty": "Years Of Experirnce is Required" }).trim(),
  source: Joi.string().required().messages({ "string.empty": "Source is Required" }).trim(),
  panIndia: Joi.string().required().messages({ "string.empty": "PAN India is Required" }).trim(),
  ugEducationDetail: Joi.string().required().messages({ "string.empty": "UG Education Detail is Required" }).trim(),
  ugStream: Joi.string().required().messages({ "string.empty": "UG Stream is Required" }).trim(),
  ugPassOutYear: Joi.string().required().messages({ "string.empty": "UG Passout Year is Required" }).trim(),
  ugAggregate: Joi.string().required().messages({ "string.empty": "UG Aggregate is Required" }).trim(),
  pgEducationDetail: Joi.string().allow("").allow(null).trim(),
  pgStream: Joi.string().allow("").allow(null).trim(),
  pgPassOutYear: Joi.string().allow("").allow(null).trim(),
  pgAggregate: Joi.string().allow("").allow(null).trim(),
  skills: Joi.string().required().messages({ "string.empty": "Skills is Required" }).trim(),
  driveName: Joi.string().allow("").allow(null).trim(),

})

//! Joi validation ends for front end

//! Joi validation starts for walkin
//  let schema = Joi.object({
//   candidateId: Joi.string().required(),
//   fullName: Joi.string().max(50).required().pattern(/^[A-Za-z\s.]+$/).trim().
//     messages({
//       "string.empty": "Full Name is Required",
//       "string.pattern.base": "Full Name Must Contain Alphabets", "string.max": "Full Name must be less than or equal to 30 characters"
//     }),

//   email: Joi.string().email().messages({ "string.email": "Invalid Email" }).allow("").allow(null).trim(),

//   mobileNumber: Joi.string().required().min(5).
//     messages({ "string.empty": "Contact Number is Required", "string.max": "Only 10 Numbers Allowed", 
//     "string.pattern.base": "Invalid Contact Number"}).trim(),

//   alternativeNumber: Joi.string().max(10).allow("").allow(null).
//     messages({ "string.max": "Only 10 Numbers Allowed", "string.pattern.base": "Invalid Contact Number" }).trim(),

//   yearsOfExp: Joi.string().messages({ "string.empty": "Years Of Experirnce is Required" }).allow("").allow(null).trim(),
//   source: Joi.string().required().messages({ "string.empty": "Source is Required" }).allow("").allow(null).trim(),
//   panIndia: Joi.string().required().messages({ "string.empty": "PAN India is Required" }).allow("").allow(null).trim(),
//   ugEducationDetail: Joi.string().messages({ "string.empty": "UG Education Detail is Required" }).allow("").allow(null).trim(),
//   ugStream: Joi.string().messages({ "string.empty": "UG Stream is Required" }).allow("").allow(null).trim(),
//   ugPassOutYear: Joi.string().messages({ "string.empty": "UG Passout Year is Required" }).allow("").allow(null).trim(),
//   ugAggregate: Joi.string().messages({ "string.empty": "UG Aggregate is Required" }).allow("").allow(null).trim(),
//   pgEducationDetail: Joi.string().allow("").allow(null).trim(),
//   pgStream: Joi.string().allow("").allow(null).trim(),
//   pgPassOutYear: Joi.string().allow("").allow(null).trim(),
//   pgAggregate: Joi.string().allow("").allow(null).trim(),
//   skills: Joi.string().required().messages({ "string.empty": "Skills is Required" }).allow("").allow(null).trim(),
//   driveName: Joi.string().allow("").allow(null).trim(),

// })

//! Joi validation ends for walkin


//! ---------------------old walkin data---------------------
const walkinsData = async (req, res, next) => {
  try {
    let wdata = []
    let data = []
    const file = reader.readFile(`./public/uploads/${req.file.originalname}`)
    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
      temp.forEach((res) => {
        data.push(res)
      })
    }
    console.log(data)


    for (let ele in data) {

      const uuid = uuidv4();
      const r1 = uuidv4();
      const r2 = uuidv4();
      const r3 = uuidv4();

      let { error, value } = schema.validate({
        candidateId: uuid,
        fullName: data[ele].fullName,
        email: data[ele].email,
        mobileNumber: data[ele].mobileNumber?.toString(),
        alternativeNumber: data[ele].alternativeNumber?.toString(),
        yearsOfExp: data[ele].yearsOfExp?.toString(),
        source: data[ele].source,
        panIndia: data[ele].panIndia,
        ugEducationDetail: data[ele].ugEducationDetail,
        ugStream: data[ele].ugStream,
        ugPassOutYear: data[ele].ugPassOutYear?.toString(),
        ugAggregate: data[ele].ugAggregate?.toString(),
        pgEducationDetail: data[ele].pgEducationDetail,
        pgStream: data[ele].pgStream,
        pgPassOutYear: data[ele].pgPassOutYear?.toString(),
        pgAggregate: data[ele].pgAggregate?.toString(),
        skills: data[ele].skills,
        driveName: data[ele].driveName
      });
      if (error) {
        // console.log(error)
        return res
          .status(502)
          .json({ error: true, message: error.message + ` in row ${Number(ele) + 1}` });
      }
      // const createdBy = req.user.email;

      const emailCheck = await Candidate.findOne({ email: data[ele].email });
      const mobileCheck = await Candidate.findOne({ mobileNumber: data[ele].mobileNumber });
      if (emailCheck) {
        return res
          .status(502)
          .json({ error: true, message: `${data[ele].email} Email id is already exist: Please Check Row ${Number(ele) + 1}` });
      }
      if (mobileCheck) {
        return res
          .status(502)
          .json({ error: true, message: `${data[ele].mobileNumber} Mobile number is already exist: Please Check Row ${Number(ele) + 1}` });
      }


      await Candidate.create({
        ...value,
        overallStatus: data[ele].FinalStatus.toUpperCase(),
        createdBy: "Old walkin Data",
        createdFrom: "Old walkin Data",

      })

      await Feedback.create({
        feedbackId: r1,
        candidateId: uuid,
        roundType: "1st Round",
        takenBy: data[ele].Panel1,
        status: data[ele].roundOne

      })

      await Feedback.create({
        feedbackId: r2,
        candidateId: uuid,
        roundType: "2nd Round",
        takenBy: data[ele].Panel2,
        status: data[ele].roundTwo

      })
      await Feedback.create({
        feedbackId: r3,
        candidateId: uuid,
        roundType: "3rd Round",
        takenBy: data[ele].Panel3,
        status: data[ele].roundThree

      })


      //  await free.create({
      //   candidateId: uuid,  
      //  })
    }

    wdata = await Candidate.find({})

    res.status(200).json({ error: false, message: "Excel added successfully", data: wdata })
  }
  catch (err) {
    next(err)
    // console.log(err)
  }

  // res.send("working")
}

//! ---------------------old walkin data---------------------


//! add techCandidate

const addTechCandidate = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      alternativeNumber,
      yearsOfExp,
      source,
      panIndia,
      ugEducationDetail,
      ugStream,
      ugPassOutYear,
      ugAggregate,
      pgEducationDetail,
      pgStream,
      pgPassOutYear,
      pgAggregate,
      skills,
      driveName
    } = req.body;

    const uuid = uuidv4();

    let { error, value } = schema.validate({
      candidateId: uuid,
      fullName,
      email,
      mobileNumber,
      alternativeNumber,
      yearsOfExp,
      source,
      panIndia,
      ugEducationDetail,
      ugStream,
      ugPassOutYear,
      ugAggregate,
      pgEducationDetail,
      pgStream,
      pgPassOutYear,
      pgAggregate,
      skills,
      driveName
    });
    if (error) {
      return res
        .status(502)
        .json({ error: true, message: error.message });
    }
    else {


      const emailCheck = await Candidate.findOne({ email });
      const mobileCheck = await Candidate.findOne({ mobileNumber });
      if (emailCheck) {
        return res
          .status(502)
          .json({ error: true, message: "Email id is already exist" });
      }
      if (mobileCheck) {
        return res
          .status(502)
          .json({ error: true, message: "Mobile number is already exist" });
      }



      const candidate = await Candidate({
        ...value,
        createdBy: "Candidate from Website",
        createdFrom: "TechnoElevate Website",
        verified: true
      }).save();



      if (candidate) {
        res.status(200).json({
          error: false,
          message: "Candidate added successfully",
          data: candidate,
        });
      } else {
        res.status(502).json({ error: true, message: "Operation failed" });
      }
    }


  } catch (err) {
    next(err);
  }
};


//! addAllCandidates code

const addAllCandidates = async (req, res, next) => {
  debugger
  try {
    let data = []
    const file = reader.readFile(`./public/uploads/${req.file.originalname}`)
    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
      temp.forEach((res) => {
        data.push(res)
      })
    }
let driveNames;

    for (let ele in data) {
//! uuid added to schema validation because in joy validation candidateId is available 
      const uuid = uuidv4();
      let { error, value } = schema.validate({
        candidateId: uuid,
        fullName: data[ele].fullName,
        email: data[ele].email,
        mobileNumber: data[ele].mobileNumber?.toString(),
        alternativeNumber: data[ele].alternativeNumber?.toString(),
        yearsOfExp: data[ele].yearsOfExp?.toString(),
        source: data[ele].source,
        panIndia: data[ele].panIndia,
        ugEducationDetail: data[ele].ugEducationDetail,
        ugStream: data[ele].ugStream,
        ugPassOutYear: data[ele].ugPassOutYear?.toString(),
        ugAggregate: data[ele].ugAggregate?.toString(),
        pgEducationDetail: data[ele].pgEducationDetail,
        pgStream: data[ele].pgStream,
        pgPassOutYear: data[ele].pgPassOutYear?.toString(),
        pgAggregate: data[ele].pgAggregate?.toString(),
        skills: data[ele].skills,
        driveName: data[ele].driveName
      });
      if (error) {
        // console.log(error)
        return res
          .status(502)
          .json({ error: true, message: error.message + ` in row ${Number(ele) + 2}` });
      }
      // const createdBy = req.user.email;
      //! in excel canndidateid,createdBy,createdFrom is not available that is why canndidateid,createdBy,createdFrom is added to excel so that we can add whole data to database without any validation errors
      data[ele].candidateId = uuid;
      data[ele].createdBy = "Testing";
      data[ele].createdFrom = "Ty Walk In Bulk Upload";

      //! getting drivename from excel
      driveNames=data[ele].driveName;

      // const emailCheck = await Candidate.findOne({ email: data[ele].email });
      // const mobileCheck = await Candidate.findOne({ mobileNumber: data[ele].mobileNumber });
      // if (emailCheck) {
      //   return res
      //     .status(502)
      //     .json({ error: true, message: `${data[ele].email} Email id is already exist: Please Check Row ${Number(ele) + 2}` });
      // }
      // if (mobileCheck) {
      //   return res
      //     .status(502)
      //     .json({ error: true, message: `${data[ele].mobileNumber} Mobile number is already exist: Please Check Row ${Number(ele) + 2}` });
      // }
    }

    let emails = data.map(doc => {
      return doc.email
    })

    let mobiles = data.map(doc => {
      return doc.mobileNumber
    })


    let datacheck = await Candidate.find({$or:[{email: { $in: emails }},{mobileNumber: { $in: mobiles }}],
      driveName:driveNames  },{_id:0,email:1,mobileNumber:1})
    console.log("Mobiles ", datacheck)
    console.log("Length ", datacheck.length)

    if (datacheck.length>0) {
        return res
          .status(502)
          .json({ error: true, message: `Email ${datacheck[0].email} or  Mobile number ${datacheck[0].mobileNumber} is already exist for the given Drive` });
      }
      else
      {
        await Candidate.insertMany(data)

        res.status(200).json({ error: false, message: "Excel added successfully", data: data })
      }
  }
  catch (err) {
    next(err)
    // console.log(err)
  }

  // res.send("working")
}

//! addCandidate code

const addCandidate = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      alternativeNumber,
      yearsOfExp,
      source,
      panIndia,
      ugEducationDetail,
      ugStream,
      ugPassOutYear,
      ugAggregate,
      pgEducationDetail,
      pgStream,
      pgPassOutYear,
      pgAggregate,
      skills,
      driveName
    } = req.body;

    const uuid = uuidv4();

    let { error, value } = schema.validate({
      candidateId: uuid,
      fullName,
      email,
      mobileNumber,
      alternativeNumber,
      yearsOfExp,
      source,
      panIndia,
      ugEducationDetail,
      ugStream,
      ugPassOutYear,
      ugAggregate,
      pgEducationDetail,
      pgStream,
      pgPassOutYear,
      pgAggregate,
      skills,
      driveName
    });
    if (error) {
      // console.log(error)
      return res
        .status(502)
        .json({ error: true, message: error.message });
    }
    else {
      const createdBy = req.user.email;

      const emailCheck = await Candidate.findOne({ email });
      const mobileCheck = await Candidate.findOne({ mobileNumber });
      if (emailCheck) {
        return res
          .status(502)
          .json({ error: true, message: "Email id is already exist" });
      }
      if (mobileCheck) {
        return res
          .status(502)
          .json({ error: true, message: "Mobile number is already exist" });
      }


      // const { fullHash, otp } = createNewOTP(email);
      // const name = [firstName, middleName, lastName].join(" ").toString();
      // await sendOTP(email, otp, fullName);
      const candidate = await Candidate({
        ...value,
        createdBy,
        createdFrom: "Ty Walk In"
      }).save();
      // const candidate = await Candidate({
      //   candidateId: uuid,
      //   fullName,
      //   emailId,
      //   contactNumber,
      //   alternativeNumber,
      //   yearsOfExp,
      //   source,
      //   panIndia,
      //   ugEducationDetail,
      //   ugStream,
      //   ugPassOutYear,
      //   ugAggregate,
      //   pgEducationDetail,
      //   pgStream,
      //   pgPassOutYear,
      //   pgAggregate,
      //   skills
      // }).save();


      if (candidate) {
        res.status(200).json({
          error: false,
          message: "Candidate added successfully",
          data: candidate,
        });
      } else {
        res.status(502).json({ error: true, message: "Operation failed" });
      }
    }
    //! Joi validation ends

  } catch (err) {
    next(err);
  }
};

//! onBoarded

const onBoard = async (req, res, next) => {


  let {data:{data}}=await axios.get("http://10.10.20.98:9090/api/v1/candidateInfo/send/ONBOARDED_HIRE_WISE")
  console.log(data)

  let { onboardingCandidate } = req.body;
  console.log({onboardingCandidate})
  try {
    let candidate = await Candidate.find({
      candidateId: { $in: onboardingCandidate },
    });

  for (let c of candidate) {
    await Candidate.findOneAndUpdate(
      { candidateId: c.candidateId },
      { onBoard: true },
      { new: true }
    );
    candidateMail(c.email,c.fullName,data)
  }
  return res
  .status(200)
  .json({ error: false, message: "Onboarded Successfully" });


   
   
  } catch (err) {
    next(err);
  }

  //!------------------------------------------------------

  // let { onboardingCandidate } = req.body;
  // try {
  //   let candidate = await Candidate.find();
  //   console.log(candidate);

  //   for (let c of candidate) {
  //     await Candidate.updateMany(
  //       { candidateId: c.candidateId },
  //       { onBoard: false },
  //       { new: true }
  //     );
  //   }
  //   return res
  //     .status(200)
  //     .json({ error: false, message: "Onboarded Successfully" });
  // } catch (err) {
  //   next(err);
  // }
};

const companySearch = async (req, res, next) => {
  try {
    const flagedCompany = await Company.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    // const unflagedCompany = await Candidate.find(
    //   {},
    //   {
    //     _id: 0,
    //     __v: 0,
    //     candidateId: 0,
    //     firstName: 0,
    //     middleName: 0,
    //     lastName: 0,
    //     dob: 0,
    //     age: 0,
    //     passOutYear: 0,
    //     highestQualification: 0,
    //     educationDetails: 0,
    //     email: 0,
    //     mobileNumber: 0,
    //     source: 0,
    //     branchName: 0,
    //     "experienceDetails.joinedOn": 0,
    //     "experienceDetails.complition": 0,
    //     "experienceDetails.role": 0,
    //     "experienceDetails._id": 0,
    //     createdAt: 0,
    //     updatedAt: 0,
    //     hashedOTP: 0,
    //     verified: 0,
    //     overallStatus: 0,
    //     remarks: 0,
    //   }
    // );

    // unflagedCompany.length &&
    //   unflagedCompany.map(item => {
    //     if (item.experienceDetails[0]) {
    //       const obj = JSON.parse(JSON.stringify(item.experienceDetails[0]));
    //       flagedCompany.push({ ...obj, location: "", flag: false });
    //     }
    //   });

    res.json({
      error: false,
      message: "All company fetched successfully",
      data: flagedCompany,
    });
  } catch (err) {
    next(err);
  }
};

const candidateSearch = async (req, res, next) => {
  try {
    const { id } = req.params;
    let candidate = "";
    candidate = await Candidate.aggregate([
      { $match: { email: id } },
      {
        $lookup: {
          from: "feedbacks",
          localField: "candidateId",
          foreignField: "candidateId",
          as: "feedback",
        },
      },
    ]);
    // console.log(id, candidate)
    if (!candidate.length) {
      candidate = await Candidate.aggregate([
        { $match: { mobileNumber: IDBIndex } },
        {
          $lookup: {
            from: "feedbacks",
            localField: "candidateId",
            foreignField: "candidateId",
            as: "feedback",
          },
        },
      ]);
    }


    if (candidate.length) {
      res.status(200).json({
        error: false,
        message: "Candidate data searched successfully",
        data: candidate,
      });
    } else {
      res.status(503).json({
        error: true,
        message: "Candidate not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const getAllCandidate = async (req, res, next) => {
  try {

    const candidate = await Candidate.aggregate([
      // {
      //   $match: { verified: true },
      // },
      {
        $lookup: {
          from: "feedbacks",
          localField: "candidateId",
          foreignField: "candidateId",
          as: "feedback",
        },
      },
    ]);
    if (candidate) {
      res.json({
        error: false,
        message: "Candidates data fetched successfully",
        data: candidate,
      });
    } else {
      res.json({
        error: false,
        message: "Candidates not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const candidateVerification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res
        .status(502)
        .json({ error: true, message: "Candidate is not found" });
    }
    const verified = await verifyOTP(candidate.hashedOTP, otp);
    if (verified) {
      candidate.verified = true;
      const data = await candidate.save();

      res
        .status(200)
        .json({ error: false, message: "OTP Verified Successfully", data });
    } else {
      res.status(502).json({ error: true, message: "OTP verfication failed" });
    }
  } catch (err) {
    next(err);
  }
};

const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res
        .status(502)
        .json({ error: true, message: "Candidate not found" });
    }

    const { fullHash, otp } = createNewOTP(email);
    // const name = [candidate.firstName, candidate.middleName, candidate.lastName]
    //   .join(" ")
    //   .toString();
    await sendOTP(email, otp, candidate.fullName);

    candidate.hashedOTP = fullHash;
    await candidate.save();

    res.status(200).json({ error: false, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};

const getFutureDrive = async (req, res, next) => {
  try {
    const drive = await Drive.find(
      {
        driveDate: { $gte: new Date().toDateString() },
      },
      {
        driveId: 1,
        driveName: 1,
        driveLocation: 1,
        driveDate: 1,
        _id: 0,
      }
    );
    res.json({
      error: false,
      message: "Fetched all the available drives",
      data: drive,
    });
  } catch (err) {
    next(err);
  }
};

const addFeedback = async (req, res, next) => {
  try {
    const {
      candidateId,
      roundType,
      takenBy,
      detailedFeedback,
      techStack,
      theoreticalKnowledge,
      practicalKnowledge,
      groomable,
      learningAbility,
      status,
    } = req.body;

    const uuid = uuidv4();

    if (roundType === "Technical") {
      if (
        !theoreticalKnowledge ||
        !practicalKnowledge ||
        !groomable ||
        !learningAbility
      ) {
        return res
          .status(502)
          .json({ error: true, message: "Parameters required." });
      }
    }

    const createdBy = req.user.email;

    const feedback = await Feedback({
      feedbackId: uuid,
      candidateId,
      roundType,
      takenBy,
      detailedFeedback,
      techStack,
      theoreticalKnowledge,
      practicalKnowledge,
      groomable,
      learningAbility,
      createdBy,
      status,
    }).save();

    res.status(200).json({
      error: false,
      message: "Feedback added successfully",
      data: feedback,
    });
  } catch (err) {
    next(err);
  }
};

const interviewStatus = async (req, res, next) => {
  try {
    const { candidateId, status, remarks } = req.body;

    if (status.toUpperCase() === "REJECTED" && !remarks) {
      return res
        .status(503)
        .json({ error: true, message: "Remarks is required" });
    }

    const candidate = await Candidate.findOne({ candidateId });
    if (candidate) {
      const remarkesGivenBy = req.user.userId;
      candidate.overallStatus = status.toUpperCase();
      candidate.remarks = remarks;
      candidate.remarkesGivenBy = remarkesGivenBy;
      const data = await candidate.save();
      res.status(200).json({
        error: false,
        message: "Interview status updated successfully",
        data,
      });
    } else {
      return res
        .status(502)
        .json({ error: true, message: "Candidate is not found" });
    }
  } catch (err) {
    next(err);
  }
};

//! check onboard

let checkOnBoard=async (req, res, next) => {
  try {
    const { email, mobileNumber } = req.body;

    

    const candidate = await Candidate.findOne({ mobileNumber,email,onBoard:true });
    if (candidate) {
      
      res.status(200).json({
        error: false,
        message: "Candidate Available",
        isAvailable:true,
        data:candidate
      });
    } else {
      return res
        .status(502)
        .json({ error: true, message: "Candidate not found",isAvailable:false,data:null });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTechCandidate,
  addAllCandidates,
  addCandidate,
  companySearch,
  candidateSearch,
  getAllCandidate,
  candidateVerification,
  resendOTP,
  addFeedback,
  interviewStatus,
  getFutureDrive,
  walkinsData,
  onBoard,
  checkOnBoard
};
