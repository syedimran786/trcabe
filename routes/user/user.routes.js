const {
  addCandidate,
  companySearch,
  candidateSearch,
  getAllCandidate,
  candidateVerification,
  resendOTP,
  addFeedback,
  interviewStatus,
  getFutureDrive,
  addAllCandidates,
  addTechCandidate,
  walkinsData,
  onBoard,
  checkOnBoard
} = require("../../controller/user.controller");
const auth = require("../../adapters/auth");
const multer = require('multer');


//!Multer code

let storage=multer.diskStorage({
  destination:function(req,file,cb)
  {
    cb(null,'./public/uploads')
  },
  filename:function(req,file,cb)
  {
    cb(null,file.originalname)
  }
})


let upload=multer({storage:storage})

//!Multer code


module.exports.routesConfig = router => {
  router.post("/add/candidate", auth, addCandidate);
  router.post("/add/techCandidate", addTechCandidate);

  //! changes
  router.post("/add/allCandidates",upload.single('file'),auth,addAllCandidates);
  router.post("/add/onboard",auth,onBoard);

  router.post("/add/walkin",upload.single('walkin'), walkinsData);
  router.post("/checkonboard", checkOnBoard);



  router.get("/search/company", auth, companySearch);
  router.get("/search/candidate/:id", auth, candidateSearch);
  router.get("/get/all/candidate", auth, getAllCandidate);
  router.post("/verify/otp", auth, candidateVerification);
  router.post("/resend/otp", auth, resendOTP);
  router.post("/add/feedback", auth, addFeedback);
  router.put("/update/interviewstatus", auth, interviewStatus);
  router.get("/get/available/drive", getFutureDrive);

  return router;
};
