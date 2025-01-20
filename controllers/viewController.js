const Tour = require("../model/tourModel");
const axios = require("axios");
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");

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
  res.status(200).render("tour", { title: tour?.name, tour });
});

exports.loginUserForm = catchAsyncError(async (req, res, next) => {
  res.status(200).render("login", { title: "Log into your account" });
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
      `http://localhost:3000/api/v1/users/verifyMe/${token}`
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
