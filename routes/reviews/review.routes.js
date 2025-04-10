const { createReviews, getAllReviews} = require("../../controller/reviews.controller");
const { uploadFile, deleteFile } = require("../../controller/upload.controller");
const { upload, handleUploadErrors } = require('../../helper/multerHelper');


//! code from chat gpt to upload multiple,single file and to delete the file

// // Single file upload
// router.post('/upload', 
//     upload.single('file'), 
//     handleUploadErrors,
//     uploadFile
//   );
  
//   // Multiple files upload
//   router.post('/upload-multiple', 
//     upload.array('files', 5), // Max 5 files
//     handleUploadErrors,
//     uploadFile
//   );
  
//   // Delete file
//   router.delete('/:public_id', deleteFile);
//!---------------------


module.exports.routesConfig = router => {
    // Single file upload
    router.post("/add/review", upload.single('photo'), 
    handleUploadErrors,
    createReviews);
    router.get("/get/reviews", getAllReviews);

    return router;
}