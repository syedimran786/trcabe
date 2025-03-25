const {
  uploadExcel,
  exportExcel,
  addCompany,
  getAllCompany,
  deleteCompany,
  updateCompany,
  getAllUser,
  addDrive,
  updateUser,
  deleteUser,
  inviteUser,
  getAllDrive,
  updateDrive,
  deleteDrive,
} = require("../../controller/admin.controller");
const auth = require("../../adapters/auth");
const multer = require("multer");
const os = require("os");
const tempDir = os.tmpdir(); // get temp directory
const upload = multer({
  dest: `${tempDir}/TY-Walk-In's/local`,
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

module.exports.routesConfig = router => {
  router.post("/upload", auth, upload.single("file"), uploadExcel);
  router.get("/export", auth, exportExcel);
  router.post("/add/company", auth, addCompany);
  router.get("/get/all/company", auth, getAllCompany);
  router.delete("/delete/company", auth, deleteCompany);
  router.put("/update/company", auth, updateCompany);
  router.get("/get/all/user", auth, getAllUser);
  router.post("/add/drive", auth, addDrive);
  router.put("/update/user", auth, updateUser);
  router.delete("/delete/user", auth, deleteUser);
  router.post("/invite/user", auth, inviteUser);
  router.get("/get/all/drive", auth, getAllDrive);
  router.put("/update/drive", auth, updateDrive);
  router.delete("/delete/drive", auth, deleteDrive);

  return router;
};
