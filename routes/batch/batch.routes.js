const { addBatch, getAllBatches } = require("../../controller/batch.controller");


module.exports.routesConfig = router => {
    router.post("/create/batch", addBatch);
    router.get("/get/batches", getAllBatches);

    return router;
}