const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "what is your name ?"],
  },

  email: {
    type: String,
    required: [true, "user must have an email"],
    unique: true,
    lower: true,
    validate: [isEmail, "pls provide a valid email"],
  },
  emailVerificationToken: String,
  emailVerificationTokenExpiresIn: Date,
  emailVerifiedAt: Date,
  emailUpdatedAt: Date,
  lastEmailChangeAt: Date,
  photo: { type: String, default: "default.jpg" },
  role: {
    type: String,
    enum: ["user", "admin", "guide", "lead-guide"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "pls provide a password"],
    minLength: 8,
    select: false,
  },
  passwordUpdatedAt: Date,
  passwordConfirm: {
    type: String,
    required: [true, "pls confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same",
    },
  },
  passwordResetToken: String,
  passwordResetTokenExpiresIn: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  // only run this function if password is modified
  if (!this.isModified("password")) return next();
  // hash password and delete confirmPassword
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  // query middleware that run on find ,findon ,findone and moree that start with find
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.checkCorrectPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

//
userSchema.pre("save", function (next) {
  if (this.isModified("email") && !this.isNew) {
    this.emailUpdatedAt = Date.now();
    this.lastEmailChangeAt = Date.now();
    // this.emailVerifiedAt = undefined;
  }
  next();
});

userSchema.methods.CheckPasswordChanged = function (JWTtimeStamp) {
  if (this.passwordUpdatedAt) {
    const passwordUpdatedAtTimestamp = parseInt(
      this.passwordUpdatedAt.getDate() / 1000,
      10
    );
    return JWTtimeStamp < passwordUpdatedAtTimestamp;
  }
  // return false meaning password is not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // 1) create the token
  const resetToken = crypto.randomBytes(32).toString("hex");
  // 2) hash the token and set the passwordResetToken to it
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // 3) set the expires time
  this.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 100;
  // 4) return the reset token
  return resetToken;
};

// email verification
userSchema.methods.createEmailVerificationToken = function () {
  // 1) create the token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  // 2)  hash the token
  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  // 3) set the  emailVerificationTokenExpiresIn
  this.emailVerificationTokenExpiresIn = Date.now() + 10 * 60 * 1000;

  // 4) return the verification token
  return verificationToken;
};
// check if user has verified their account
userSchema.methods.checkEmailVerified = function () {
  // return true or false
  return this.emailVerifiedAt !== undefined;
};
// check if user has just changed email
userSchema.methods.checkEmailChanged = function () {
  // return true or false
  return this.emailUpdatedAt !== undefined;
};
// check if the user is new so they wont be able to update their account for 2hrs
userSchema.methods.checkNewUser = function () {
  // const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
  const twoHoursInMilliseconds = 2 * 60 * 1000;
  return Date.now() - this.createdAt < twoHoursInMilliseconds;
};
// check when last they chnaged the email so after 24 hrs before they can make any chnages
userSchema.methods.checkEmailLastChanged = function (isLastChange = true) {
  const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  if (isLastChange) {
    return (
      this.lastEmailChangeAt &&
      Date.now() - this.lastEmailChangeAt < cooldownPeriod
    );
  } else {
    // If emailVerifiedAt is undefined, consider it as not recently verified
    return (
      this.emailVerifiedAt && Date.now() - this.emailVerifiedAt < cooldownPeriod
    );
  }
};

module.exports = mongoose.model("User", userSchema);
