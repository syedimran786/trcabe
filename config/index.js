require("dotenv").config();
module.exports.config = {
  dbConfig: {
    url:
      process.env.ENV === "DEV"
        // ? `mongodb://10.10.20.17:27017/ty_walk_ins`
        ?`mongodb://127.0.0.1:27017/restcoderacademy`
        : `mongodb+srv://tewalkins:are0n3vtkvdchsur@walkins.cdsrjzu.mongodb.net/TechnoElevate?retryWrites=true&w=majority` ,
       
    option: {
      user: "",
      pass: "",
      autoIndex: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },  
  encryption: {
    secret: "RESTCODERACADEMY",
  },
};
