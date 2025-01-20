const express = require("express");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const Router = express.Router();
Router.get(
  "/check-out/:tourId",
  authController.protect,
  bookingController.getCheckout
);
module.exports = Router;
