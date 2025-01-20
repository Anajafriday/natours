const Tour = require("../model/tourModel");
const axios = require("axios");
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const Booking = require("../model/bookingModel");

exports.getOverview = catchAsyncError(async (req, res) => {
  const tours = await Tour.find();

  res.status(200).render("overview", {
    title: "Exciting tours for adventurous people",
    tours,
  });
});

exports.getTourDetail = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;

  // get the tour using the slug
  const tour = await Tour.findOne({ slug }).populate({
    path: "reviews",
    fields: "review reviewer rating",
  });

  if (!tour) {
    return next(new AppError(`no tour of "${slug}" can be find `, 404));
  }
  // console.log(res.locals.user)
  // check if the current user has bookedthis tour 
  const mybooking = await Booking.findOne({ user: res?.locals?.user?._id, tour: tour.id })
  res.status(200).render("tour", { title: tour?.name, tour, isBookedByMe: mybooking !== null });
});

exports.loginUserForm = catchAsyncError(async (req, res, next) => {
  res.status(200).render("login", { title: "Log into your account" });
});
exports.signupUserForm = catchAsyncError(async (req, res, next) => {
  res.status(200).render("signup", { title: "Create a new account" });
});
exports.getAccount = catchAsyncError(async (req, res, next) => {
  res.status(200).render("account", { title: "Your Profile" });
});

exports.updateUserDataFormMethod = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name.trim(),
      email: req.body.email,
    },
    { new: true, runValidators: true }
  );
  res.status(200).render("account", { title: "Your Profile", user });
});

exports.getAccountVerified = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).render("verify", {
      message: "Invalid or missing token.",
      email: null,
    });
  }

  try {
    // Sending a POST request to the API endpoint
    const response = await axios.post(
      // `http://localhost:3000/api/v1/users/verifyMe/${token}`
      `https://natours-by-friday.onrender.com/api/v1/users/verifyMe/${token}`
    );
    if (response.data.status === "success") {
      return res.render("verify", {
        message: "Your email has been successfully verified!",
        email: null,
      });
    }
  } catch (error) {
    // Handling errors and extracting response details
    const errorMessage =
      error.response?.data.message ||
      "Verification failed. Your token may have expired.";
    const email = error.response?.data?.email || "user@example.com";

    return res.status(400).render("verify", {
      message: errorMessage,
      email,
    });
  }
});

exports.getMybooking = catchAsyncError(async (req, res, next) => {
  // get booking based on the user id
  const mybooking = await Booking.find({ user: req.user.id })
  if (!mybooking) return next()
  // map out tour ids
  const tourIds = mybooking.map(book => book.tour)
  // get tours from booking
  const tours = await Tour.find({ _id: { $in: tourIds } })
  // render
  res.render("overview", { title: "my bookings", tours })
})