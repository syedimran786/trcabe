const express = require("express");
const { errorlogger, reqlogger } = require("./adapters/logger");
require("dotenv").config();
const { config } = require("./config/index");
const { db } = require("./helper/dbConnect");
const { adminRoutes, authRoutes, userRoutes,enquiryRoutes,batchRoutes,reviewRoutes } =
  require("./routes/index").routes();

const app = express();
const expressServer = async () => {
  db.connect(config.dbConfig.url, config.dbConfig.option);

  //CORS handling
  app.all("/*", (request, response, next) => {
    if (request.method !== "OPTIONS") {
      reqlogger.http(request);
    }
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    response.header("Access-Control-Expose-Headers", "*");
    response.header(
      "Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH"
    );
    response.header("Access-Control-Allow-Credentials", true);
    next();
  });

  app.use(express.urlencoded({ extended: true, limit: "20mb" }));
  app.use(express.json({ limit: "20mb" }));

  
  //test Api
  app.get("/", async (req, res, next) => {
    res.json({ message: "welcome" });
  });

  // logger
  app.use("/log/error", (req, res) => {
    res.sendFile(path.join(__dirname, "./info.log"));
  });

  app.use("/log/http", (req, res) => {
    res.sendFile(path.join(__dirname, "./http.log"));
  });

  // app.use("/admin", adminRoutes);
  // app.use("/auth", authRoutes);
  // app.use("/user", userRoutes);
  app.use("/enquiries", enquiryRoutes);
  app.use("/batches", batchRoutes);
  app.use("/reviews", reviewRoutes);




  //express default error middleware
  app.use((err, req, res, next) => {
    errorlogger.error({
      req: `${req.headers.host}${req.url}`,
      data: err.message,
    });
    res.status(500).json({ error: true, message: err.message });
    next();
  });

  app.listen(process.env.PORT, () => {
    console.log(`app running on port number:${process.env.PORT}`);
  });
};

expressServer();

module.exports = app;
