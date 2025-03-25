const {
  userRegister,
  authentication,
  userVerification,
  resendUserOTP,
} = require("../../controller/auth.controller");
const auth = require("../../adapters/auth");


module.exports.routesConfig = router => {
  router.post("/user/register", userRegister);
  router.post("/authentication", authentication);
  router.post("/userVerification",auth,userVerification);
  router.post("/resend/userotp",auth, resendUserOTP);


  return router;
};
