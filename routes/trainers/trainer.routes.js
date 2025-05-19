const { createTrainer, getAllTrainers} = require("../../controller/trainer.controller");
const { uploadImage, handleUploadErrors } = require('../../helper/multerHelper');



module.exports.routesConfig = router => {
    let {upload}=uploadImage("reviews")
    // Single file upload
    router.post("/add/trainer", upload.single('photo'), 
    handleUploadErrors,
    createTrainer);
    router.get("/get/trainers", getAllTrainers);

    return router;
}
