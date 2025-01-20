const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../utils/catchAsyncError");
const User = require("./../model/userModel");
const AppError = require("../utils/appError");
const Email = require("../utils/email");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, res, statusCode) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 3600 * 1000
    ),
    // secure:true, // only in production
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  user.password = undefined;
  user.passwordUpdatedAt = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

async function sendVerificationEmail(user, next, req) {
  // create the token refer to user modal
  const verificationToken = await user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });
  const currEmail = "";
  // url
  // const url = `${req.protocol}://${req.get("host")}/api/v1/users/verifyMe/${verificationToken}`;
  const url = `${req.protocol}://${req.get("host")}/verify/${verificationToken}`;

  try {
    // send confirm account email
    await new Email(user, url).sendAccountConfirm();
    //
  } catch (error) {
    // console.log(error.message);
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("there was an error while sending email token.", 500)
    );
  }
}
exports.signup = catchAsyncError(async (req, res, next) => {
  // Check if the user exists
  const existingUser = await User.findOne({ email: req.body.email });

  let newUser;

  if (!existingUser) {
    newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    // Send verification email for new user
    await sendVerificationEmail(newUser, next, req);
  }
  //
  else if (existingUser && !existingUser.checkEmailVerified()) {
    await sendVerificationEmail(existingUser, next, req);
    return res.status(200).json({
      status: "success",
      message:
        "You have already signed up. Please check your email to verify your account  to login.",
    });
  } else {
    // Existing user and already verified, handle potential error (e.g., duplicate signup attempt)
    return next(
      new AppError("Email already exists. You are already registered.", 400)
    );
  }

  res.status(200).json({
    status: "success",
    message:
      "Account created successfully. Please check your email to verify your account.",
  });
});

exports.resendVerification = catchAsyncError(async (req, res, next) => {
  //  check if there is an email
  if (!req.body.email) {
    return next(new AppError("Please provide an email address.", 400)); // Improved error message
  }

  const user = await User.findOne({ email: req.body.email });
  //  check if there is user with that email
  if (!user) return next(new AppError("Email not found.", 400));
  // check if the user has already beign verified
  if (user.checkEmailVerified())
    return next(
      new AppError(
        "Your email is already verified. No need to resend verification.",
        400
      )
    );

  // User exists and is not verified, send verification email
  await sendVerificationEmail(user, next, req); // Call your verification email sending function

  res.status(200).json({
    status: "success",
    message: "Verification email sent successfully.",
  });
});
// 2024-11-15T16:08:27.458+00:00
const verifyUserEmail = async (req, next) => {
  // const currentEmail = req.params.currEmail;
  // 1) get token from request , hash it
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // 2)  use hashed token to compare it with the user
  const user = await User.findOne({
    emailVerificationToken: hashToken,
    emailVerificationTokenExpiresIn: { $gt: Date.now() },
  });

  // 2a) get  new email  from the user input & set it to as the user new email; then reset the token & expires in
  if (!user) {
    return next(new AppError("invalid  or expired token", 400));
  }
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiresIn = undefined;
  user.emailVerifiedAt = Date.now();
  await user.save({ validateBeforeSave: false });

  return user;
};

exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const user = await verifyUserEmail(req, next);
  await user.save({ validateBeforeSave: false });
  // 3)  update the emailVerifiedAt
  // refer usermodel line 79
  // send welcome email
  const url = `${req.protocol}://${req.get("host")}/account`;

  await new Email(user, url).sendWelcome();

  // 4) login the user
  createSendToken(user, res, 201);
});

exports.verifyNewEmail = catchAsyncError(async (req, res, next) => {
  req.body.email = req.params.newEmail;
  if (!req.body.email)
    return next(
      new AppError("pls provide the email address you are updating to.", 400)
    );
  const user = await verifyUserEmail(req, next);
  //
  if (!user)
    return next(new AppError("failed to update email try again later.", 400));
  // update user
  user.email = req.body.email;
  user.emailUpdatedAt = Date.now();
  user.emailVerifiedAt = Date.now();
  user.lastEmailChangeAt = Date.now();

  // save changes
  await user.save({ validateBeforeSave: false });
  // 4) login the user
  createSendToken(user, res, 201);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // 1 check if the email && and password exist
  if (!email || !password)
    return next(new AppError("pls provide email and password"), 400);
  const user = await User.findOne({ email }).select(
    "+password -emailVerificationToken -emailVerificationTokenExpiresIn -__v"
  );
  // 2 check if user exist && email || password is correct
  if (!user || !(await user.checkCorrectPassword(password, user.password)))
    return next(new AppError("incorrect email or password"), 401);
  // check if the user  has verified  their account
  if (!(await user.checkEmailVerified()))
    return next(
      new AppError(
        "Email verification pending. Please check your email and verify your account.",
        401
      )
    );

  // 3 if ok send tokens to the client
  createSendToken(user, res, 200);
});

exports.protect = catchAsyncError(async (req, res, next) => {
  // 1) check if the req has a header and in header there is a token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) token = req.cookies?.jwt;

  if (!token)
    return next(
      new AppError("you are not logged in, pls login to gain access", 401)
    );
  // 2) verify the token
  const verifiedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETE
  );

  // 3) check if user who associated with this token exist
  const freshUser = await User.findById(verifiedToken.id);
  if (!freshUser)
    return next(
      new AppError(
        " user associated with the  specified token could not be found,pls login again"
      )
    );
  // 4) check if the user has currently changed its password before the token was issued
  if (freshUser.CheckPasswordChanged(verifiedToken.iat)) {
    return next(
      new AppError(
        "password was recently changed by user associated with the  specified token"
      )
    );
  }
  // GRANT ACCESS
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});
// render in the pug
exports.isLoggedIn = async (req, res, next) => {
  // Check if the JWT exists in the cookies
  const token = req.cookies?.jwt;
  if (!token) return next();

  try {
    // Verify the token
    const verifiedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRETE
    );

    // Check if a user exists for this token
    const freshUser = await User.findById(verifiedToken.id);
    if (!freshUser) return next();

    // Check if the user changed their password after the token was issued
    if (freshUser.CheckPasswordChanged(verifiedToken.iat)) {
      return next();
    }

    // Make the user available to the templates
    res.locals.user = freshUser;

    return next();
  } catch (error) {
    // console.error("Error verifying JWT:", error, message);
    return next(); // Allow the request to proceed even if JWT verification fails
  }
};

exports.logout = (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  };

  res.cookie("jwt", "logout", cookieOptions);
  res.status(200).json({ status: "success" });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  // 1)check if there is an email || user associated to the email
  const { email } = req.body;
  if (!email) {
    return next(new AppError("pls provide an email"), 401);
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError("no user can be find with the  provided email"),
      404
    );
  }
  // 1b) // check if the user  has verified  their account
  if (!(await user.checkEmailVerified))
    return next(
      new AppError(
        "Email verification pending. Please check your email and verify your account."
      ),
      401
    );
  // 2) crete a reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3)send token to  that email
  const url = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;

  try {
    await new Email(user, url).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "password reset token sent successfully",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("there was an error while sending email token.", 500)
    );
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // 1) get token from request , hash it
  const hashToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // 2)  use hashed token to compare it with the user
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExpiresIn: { $gt: Date.now() },
  });
  // 2a) get  new password and passwordConfirm from the user input & set it to as the user new password then reset the token & expires in
  if (!user) return next(new AppError("inalid  or expired token"));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiresIn = undefined;
  await user.save();
  // 3) update passwordUpdated at
  // refer usermodel line 58
  // 4) login the user
  createSendToken(user, res, 201);
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  // 1) get user from collection
  const user = await User.findById(req.user.id).select("+password");
  // 2) check if the inputed password match the user password
  if (
    !(await user.checkCorrectPassword(req.body.currentPassword, user.password))
  )
    return next(new AppError("current password is incorrect"), 401);
  // 3) update
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) login user,send jwt
  createSendToken(user, res, 200);
});
