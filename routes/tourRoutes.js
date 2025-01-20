const express = require("express");
const Router = express.Router();
const tourController = require("./../controllers/tourController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");
// Router.param("id", tourController.checkID);
Router.route("/top-5-cheap-tour").get(
  tourController.getTopCheapTour,
  tourController.getAllTours
);

Router.route("/distances/:latlng/unit/:unit").get(
  tourController.getToursDistance
);
Router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(
  tourController.getToursWithin
);
// /tours-within/500/center/32.127411,-99.634835/unit/km
// NESTED ROUTES
// POST /tour/237l0/reviwes
// GET /tour/237l0/reviwes
// GET /tour/237l0/reviwes/8e8889ujej
// what the below code means mouting the review router on tour router, so basically when a request hit /:tourId/reviews or has tourId then it will use the review router
Router.use("/:tourId/reviews", reviewRouter);

Router.route("/tour-stats").get(tourController.getTourStaticstic);
Router.route("/monthly-plan/:year").get(
  authController.protect,
  authController.restrictTo("admin", "lead-guide", "guide"),
  tourController.getMonthlyPlan
);
Router.route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.creatTour
  );

Router.route("/:id")
  .get(authController.protect, tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = Router;
