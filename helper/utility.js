const crypto = require("crypto-js");
const { config } = require("../config/index");

exports.encodedString = password => {
  return crypto.AES.encrypt(password, config.encryption.secret).toString();
};

exports.decodedString = password => {
  const data = crypto.AES.decrypt(
    password.toString(),
    config.encryption.secret
  ).toString(crypto.enc.Utf8);
  return JSON.parse(JSON.stringify(data));
};
