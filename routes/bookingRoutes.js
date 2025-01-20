const express = require("express");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const Router = express.Router();
Router.use(authController.protect)
Router.get(
  "/check-out/:tourId",
  bookingController.getCheckout
);

Router.use(authController.restrictTo("admin", "lead-guild", "guild"))
Router.route("/").get(bookingController.getAllBookings).post(bookingController.createBooking)
Router.route("/:id").get(bookingController.getBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking)

module.exports = Router;
