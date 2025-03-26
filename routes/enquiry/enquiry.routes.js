const { createEnquiry, getAllEnquiries } = require("../../controller/enquiry.controller");


module.exports.routesConfig = router => {
    router.post("/create/enquiry", createEnquiry);
    router.get("/get/enquiries", getAllEnquiries);

    return router;
}