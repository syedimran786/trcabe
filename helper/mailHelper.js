const nodeMailer = require("nodemailer");

const transporterFunc = () => {
  return nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
  });
};

const sendOTP = async (email, otp, name) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: `TY-Walk In's ${process.env.email}`,
    to: email,
    subject: "OTP verification",
    html: `
    <div>Hi ${name},</div>
    <div>${otp} is your OTP for TY-Walk In's candidate email verification.</div>
    <br/>
    <br/>
    <div>Thanks & Regards,</div>
    <div>Technoelevate support team.</div>
    `,
  };
  return transporter.sendMail(mailConfigOption);
};

const inviteEmail = async (email,role,fullName) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: `TY-Walk In's ${process.env.email}`,
    to: email,
    subject: "TY-Walk In's Confirmation mail",
    html: `
    <div>Hi ${fullName} <br/> Your account is created as ${role} in TY-Walk In's</div>
    <div>Please click the below link to login</div>
    <div><a href="http://49.249.28.218:81">TY-Walk In's</a></div>
    <br/>
    <br/>
    <div>Thanks & Regards,</div>
    <div>Technoelevate support team.</div>
    `,
  };
  return transporter.sendMail(mailConfigOption);
};

const  candidateMail= async (email,fullName,rpmdata) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: `TY-Walk In's ${process.env.email}`,
    to: email,
    subject: "Form for onboarding Process",
    html: `
    <div>Hi ${fullName} <br/> Please click the below link to fill the onboarding form</div>
    <div><a href="http://10.10.20.23:5002/${rpmdata}">TY-Walk In's</a></div>
    <br/>
    <br/>
    <div>Thanks & Regards,</div>
    <div>Technoelevate HR team.</div>
    `,
  }; 
  return transporter.sendMail(mailConfigOption);
};


const  enquiryMail= async ({email,fullname,experience,mobile,message,encType}) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: {
      name: fullname,
      address: email
    },
    to: `restcoderacademyprojects@gmail.com`,
    subject: `Enquiry for ${experience}`,
    html: `
    <h1>Name: ${fullname.toUpperCase()}</h1>
    <div>
    <b>Email: ${email}</b> <br/>
    <b>Mobile: ${mobile}</b> <br/>
    <b>Experience: ${experience}</b><br/>
    <b>Re-Enquiry: ${encType}</b>

    </div>
    <p>${message}</p>

    `,
  };
  return transporter.sendMail(mailConfigOption);
};
module.exports = { sendOTP, inviteEmail ,candidateMail,enquiryMail};
