const express = require("express");
const _adminRoutes = require("./admin/admin.routes");
const _authRoutes = require("./auth/auth.routes");
const _userRoutes = require("./user/user.routes");
const _enquiryRoutes = require("./enquiry/enquiry.routes");
const _batchRoutes = require("./batch/batch.routes");
const _reviewsRoutes = require("./reviews/review.routes");
const _placementsRoutes = require("./placements/placement.routes");
const _trainersRoutes = require("./trainers/trainer.routes");






const router = express.Router();

module.exports.routes = () => {
  const adminRoutes = _adminRoutes.routesConfig(router);
  const authRoutes = _authRoutes.routesConfig(router);
  const userRoutes = _userRoutes.routesConfig(router);
  const enquiryRoutes = _enquiryRoutes.routesConfig(router);
  const batchRoutes = _batchRoutes.routesConfig(router);
  const reviewRoutes = _reviewsRoutes.routesConfig(router);
  const placementRoutes = _placementsRoutes.routesConfig(router);
  const trainerRoutes = _trainersRoutes.routesConfig(router);





  return { adminRoutes, authRoutes, userRoutes,enquiryRoutes,batchRoutes,reviewRoutes,placementRoutes,trainerRoutes};
};
