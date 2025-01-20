const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const router = express.Router();
router.get("/verify/:token", viewController.getAccountVerified);
router.use(authController.isLoggedIn);
router.get(
  "/",
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
// bookings
router.get(
  "/tour/:slug",
  authController.isLoggedIn,
  viewController.getTourDetail
);
router.get("/login", authController.isLoggedIn, viewController.loginUserForm);
router.get("/account", authController.protect, viewController.getAccount);
router.get("/mybooking", authController.protect, bookingController.getMybooking)
// router.post(
//   "/update-user-data",
//   authController.protect,
//   viewController.updateUserDataFormMethod
// );
module.exports = router;
