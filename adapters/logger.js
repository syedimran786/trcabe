const { createLogger, format, transports } = require("winston");
const { verifyToken } = require("../helper/jwtHelper");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  const { data } =
    typeof message.headers?.authorization !== undefined &&
    verifyToken(message.headers?.authorization);

  if (level === "error") {
    return `${level} Time: ${new Date(timestamp)} URL: ${message.req} Error:${
      message.data
    } User:${JSON.stringify(data)}`;
  } else if (level === "http") {
    return `${level} ${message.method} Time: ${new Date(timestamp)} URL: ${
      message.headers.host
    } ${message.url} User:${JSON.stringify(data)}`;
  }
});
const errorlogger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `error.log`, level: `error` }),
  ],
});

const reqlogger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `http.log`, level: `http` }),
  ],
});

module.exports = {
  errorlogger,
  reqlogger,
};
