const { createEnquiry } = require("../../controller/enquiry.controller");


module.exports.routesConfig = router => {
    router.post("/create/enquiry", createEnquiry);
    return router;
}