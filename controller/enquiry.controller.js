const Joi = require('joi');
const Enquiry = require("../model/enquiry.model");
const { enquiryMail } = require('../helper/mailHelper');




//! Joi validation starts for createEnquiry
 let schema = Joi.object({
  fullname: Joi.string().max(50).required().pattern(/^[A-Za-z\s.]+$/).trim().
    messages({
      "string.empty": "Full Name is Required",
      "string.pattern.base": "Full Name Must Contain Alphabets", "string.max": "Full Name must be less than or equal to 50 characters"
    }),
  email: Joi.string().required().email().messages({ "string.email": "Invalid Email" }).trim(),
  mobile: Joi.string().required().min(5).
    messages({ "string.empty": "Mobile Number is Required", "string.max": "Only 10 Numbers Allowed", 
    "string.pattern.base": "Invalid Mobile Number"}).trim(),
  experience: Joi.string().required().messages({ "string.empty": "Years Of Experirnce is Required" }).trim(),
  message: Joi.string().trim().required(),
})
const createEnquiry = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      mobile,
      experience,
      message,
    } = req.body;

  
    console.log({message})
    let { error, value } = schema.validate({
      fullname,
      email,
      mobile,
      experience,
      message:message?message:"Normal Enquiry"
    });
    if (error) {
      return res
        .status(502)
        .json({ error: true, message: error.message });
    }
   

      const enquiryCheck = await Enquiry.findOne({$or:[{email,mobile}]});
    
      if (enquiryCheck) {
       let enquiry=await Enquiry.findOneAndUpdate({$or:[{email,mobile}]},{$set:{re_enquiry:"Yes",message}},{new:true});
       await enquiryMail({ 
        fullname,
        email,
        mobile,
        experience,
        message,
        encType:"Yes"});
       return res.status(200).json({
        error: false,
        message: "Enquiry Updated successfully",
        data: enquiry,
      });
      }
      

       
 
      const enquiry = await Enquiry.create({...value})

console.log(value.message)

      if (enquiry) {
        await enquiryMail( {
            fullname,
            email,
            mobile,
            experience,
            message:value.message,
            encType:"No"
          });
       return res.status(201).json({
          error: false,
          message: "Enquiry created successfully",
          data: enquiry,
        });
    }
        res.status(502).json({ error: true, message: "Operation failed" });

    }
    //! Joi validation ends

   catch (err) {
    next(err);
  }
};


let getAllEnquiries=async(req,res,next)=>
{
    try
    {
        let enquiries=await Enquiry.find({});

        if(enquiries)
        {
            return res.status(200).json({ error: true, message: "Enquiries Fetched Successfully",data:enquiries})
        }
        return res.status(200).json({ error: true, message: "Enquiries not found" })
    }
    catch(err)
    {
        next(err)
    }
}


module.exports={
    createEnquiry,
    getAllEnquiries
}