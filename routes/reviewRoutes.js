const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const Router = express.Router({ mergeParams: true });
// without the merge params the nesting and mouting rout from tour on review isnt possible
Router.use(authController.protect);
Router.route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo("user"),
    reviewController.setTourUsersId,
    reviewController.creatReview
  );

Router.route("/:id")
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );
module.exports = Router;
