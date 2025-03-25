const otpGenerator = require("otp-generator");
const { createToken, verifyToken } = require("./jwtHelper");

const createNewOTP = email => {
  // Generate a 6 digit numeric OTP
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const ttl = 1 * 60 * 1000; // 1 minutes in milliseconds
  const expires = new Date(
    new Date().setTime(new Date().getTime() + ttl)
  ).getTime(); // timestamp to 1 minutes i the future
  const data = `${email}.${otp}`; // email.otp.expiry_timestamp
  const hash = createToken(data); // creating SHA256 hash of the data
  console.log({hash})
  const fullHash = `${hash}.${expires}`;
  console.log({fullHash})
  return { fullHash, otp };
};

const verifyOTP = async (hash, otp) => {
  // Seperate Hash value and expires from the hash returned from the user
  console.log({hash})
  const expires = hash.split(".")[3];
  const hashValue = [hash.split(".")[0], hash.split(".")[1], hash.split(".")[2]]
    .join(".")
    .toString();
  console.log({hashValue})

  // Check if expiry time has passed
  const now = Date.now();

  if (new Date(now).getTime() >= new Date(parseInt(expires, 10)).getTime())
    return false;
  // Calculate new hash with the same key and the same algorithm
  const res = await verifyToken(hashValue);
  console.log({res})
  // Match the hashes

  if (res.valid) {
    const hashOTP = res.data && res.data.split(".");
    if (otp !== hashOTP[hashOTP.length - 1]) {
      return false;
    }
    return true;
  }
  return false;
};

module.exports = { createNewOTP, verifyOTP };
