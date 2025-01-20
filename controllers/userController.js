const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const Email = require("../utils/email");
const sendEmail = require("../utils/email");
const factory = require("./factoryFunctions");
const multer = require("multer");
const sharp = require("sharp");
// multer configuration
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1]; //get the file extension eg .jpg .png etc
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`); // user-9393939-13334.jpg
//   },
// });

const multerStorage = multer.memoryStorage(); // store the file as a buffer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("only image is accepted.", 400), false);
  }
};
exports.resizeProfilePhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};
// file upload setup
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single("photo");

const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

function hasPropertyAndOthers(obj, property) {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  if (obj.hasOwnProperty(property)) {
    // Property exists, check if there are other properties
    for (const key in obj) {
      if (key !== property) {
        return true; // Other properties exist
      }
    }
  }

  return false; // Property doesn't exist or no other properties
}

exports.updateMe = catchAsyncError(async (req, res, next) => {
  // 1) Prevent password updates
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError("This route cannot be used to update password", 400)
    );
  }
  const isChangingEmail = req.body.email !== req.user.email;
  // 2) Filter unwanted fields
  const filteredBody = filterObj(req.body, "name", isChangingEmail && "email");
  if (req.file) filteredBody.photo = req.file.filename; //store only the file name in reference
  const user = await User.findById(req.user.id);
  // Check if updating email (avoid unnecessary findOne)
  if (filteredBody.email && filteredBody.email !== user.email) {
    // Check for existing user with new email (prevent duplicate emails)
    const existingUser = await User.findOne({ email: filteredBody.email });
    if (existingUser) {
      return next(new AppError("Email already in use", 400));
    }

    // Check if user is new or has recently changed email
    if (user.checkNewUser() || user.checkEmailLastChanged(true)) {
      return next(
        new AppError(
          "You cannot change your email at this time. wait after 24hrs",
          400
        )
      );
    }
    const currEmail = user.email;
    // Create verification token & send email
    const verificationToken = await user.createEmailVerificationToken();
    const url = `${req.protocol}://${req.get("host")}/api/v1/users/verifyNewEmail/${currEmail}/${req.body.email}/${verificationToken}`;

    try {
      await new Email(user, url).sendEmailChanged();

      if (!hasPropertyAndOthers(filteredBody, "email")) {
        res.status(200).json({
          status: "success",
          message:
            "Verification email sent. Please verify your new email address.",
        });
        // Update email and set emailVerified to false
      } else {
        if (filteredBody.name) user.name = filteredBody.name;
        if (filteredBody.photo) user.photo = filteredBody.photo;
        res.status(200).json({
          status: "success",
          message:
            "User information updated successfully.Please verify your new email address.",
        });
        await user.save({ validateBeforeSave: false });
      }
      user.emailVerified = false;
      await user.save({ validateBeforeSave: false });
    } catch (error) {
      // Handle email sending error and (cleanup verification data)
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpiresIn = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError("There was an error while sending email token.", 500)
      );
    }
  } else {
    // Update name only
    if (filteredBody.name) user.name = filteredBody.name;
    if (filteredBody.photo) user.photo = filteredBody.photo;
    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: "success",
    message: "User information updated successfully.",
  });
});

exports.deleteMe = catchAsyncError(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({ status: "success", data: null });
});
exports.getMe = (req, res, next) => {
  // set the params id to the userid comming from protect that way you can be able to use the getUser route with the params id
  req.params.id = req.user.id;
  next();
};
exports.creatUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "route doesnt exist use /signup instead",
  });
};
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// dont use to update password only for admin
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
