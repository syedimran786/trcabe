var jwt = require("jsonwebtoken");

const createToken = data => {
  var token = jwt.sign(data, process.env.JWTSECRETKEY);
  return token;
};

const verifyToken = token => {
  return jwt.verify(token, process.env.JWTSECRETKEY, function (err, decoded) {
    if (err) return { valid: false };
    return { valid: true, data: decoded };
  });
};

module.exports = { createToken, verifyToken };
