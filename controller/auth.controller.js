const User = require("../model/user.model");
const { createToken } = require("../helper/jwtHelper");
const { decodedString } = require("../helper/utility");
const { inviteEmail, sendOTP } = require("../helper/mailHelper");
const { createNewOTP, verifyOTP } = require("../helper/otpHelper");

const userRegister = async (req, res, next) => {
  try {
    
    const { fullName, mobile, email, role } = req.body;
    const userData = await User.findOne({ email });
    if (userData) {
      return res
        .status(502)
        .json({ error: true, message: `${email} is already exist as ${userData.role}` });
    }

    const data = await User({ fullName, mobile, email, role }).save();
    if (data) {
      await inviteEmail(data.email, data.role,data.fullName);
      res
        .status(200)
        .json({ error: false, message: `${role==="admin"?"Admin":"User"} added and Invite sent successfully`, data });
    } else {
      res.status(502).json({
        error: true,
        message: "Operation failed",
      });
    }
  } catch (err) {
    next(err);
  }
};

const authentication = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(503).json({ error: true, message: "User not found" });
    }

    // if (password !== decodedString(user.password)) {
    //   return res
    //     .status(503)
    //     .json({ error: true, message: "Invalid credentials" });
    // }

    const { fullHash, otp } = createNewOTP(email);
    await sendOTP(email, otp, user.fullName);

    let updateOtp=await User.findByIdAndUpdate(user._id, {hashedOTP: fullHash}, {new:true,runValidators:true});
    res.status(201).json({
        error: false,
        message: `OTP sent to ${email}`,
      });
    // const token = createToken({ userId: user.userId, role: user.role });
    // res.header("token", token);
    // console.log(token)
    // res.status(200).json({
    //   error: false,
    //   message: "User login successfull",
    // });
  } catch (err) {
    next(err);
  }
};

const userVerification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res
        .status(502)
        .json({ error: true, message: "User not found" });
    }
    const verified = await verifyOTP(user.hashedOTP, otp);
    if (verified) {
      user.verified = true;
      const data = await user.save();

      const token = createToken({ email: user.email, role: user.role });
    res.header("token", token);
    
      res
        .status(200)
        .json({ error: false, message: "OTP Verified Successfully", data:{role:data.role,token} });
    } else {
      res.status(502).json({ error: true, message: "OTP verfication failed" });
    }
  } catch (err) {
    next(err);
  }
};


const resendUserOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(502)
        .json({ error: true, message: "User not found" });
    }

    const { fullHash, otp } = createNewOTP(email);
   
    await sendOTP(email, otp, user.fullName);

    user.hashedOTP = fullHash;
    await user.save();

    res.status(200).json({ error: false, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { userRegister, authentication, userVerification,resendUserOTP};
