const { createPlacements,getAllPlacements } = require("../../controller/placement.controller");
const { uploadImage, handleUploadErrors } = require('../../helper/multerHelper');

//! Unexpected field error comes when the file name is different in upload.single or upload.fields


module.exports.routesConfig = router => {
    
    let {upload}=uploadImage("placements")
    // Single file upload
    router.post("/add/placement", upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'company', maxCount: 1 }
      ]), 
    handleUploadErrors,
    createPlacements);
    router.get("/get/placements", getAllPlacements);
 

    return router;
}