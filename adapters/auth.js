// const { verifyToken } = require("../helper/jwtHelper");

// const authorization = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: true, message: "A token is required for authentication" });
//   }

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded.data;
//     console.log("req.user------------->", req.user)
//   } catch (err) {
//     return res.status(401).json({ error: true, message: "Invalid Token" });
//   }
//   return next();
// };

// module.exports = authorization;


// sso integration


// const { verifyToken } = require("../helper/jwtHelper");

// const authorization = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ error: true, message: "A token is required for authentication" });
//   }

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded.data;
//     console.log("req.user------------->", req.user)
//   } catch (err) {
//     return res.status(401).json({ error: true, message: "Invalid Token" });
//   }
//   return next();
// };

// module.exports = authorization;






const axios = require('axios');

const authorization = async (req, res, next) => {
  const token = req.headers.authorization; // Replace with your token value
 
  try {
    const response = await axios.post('http://10.10.20.22:9092/api/v1/auth/varify-token', {token}, {
      headers: {
        'Terminalid': req.headers.terminalid 
      }
    }).then((result)=>{
      if (result.data.data.varifyToken === true) {
        console.log("result---------",result)
        return next(); 
      } else {
        console.log("error---------",error)

        return res.status(401).json({ error: 'Authentication failed.' });
      }
    }).catch((err)=>{
      console.log(err)
      return res.status(401).json({ error: err.message });

    });
   
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};



module.exports =  authorization
