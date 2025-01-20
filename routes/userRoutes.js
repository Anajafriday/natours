const express = require("express");

const Router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

// USER ITSELF
Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);
Router.route("/logout").get(authController.logout);

Router.route("/forgetPassword").post(authController.forgetPassword);
Router.route("/resetPassword/:token").patch(authController.resetPassword);
Router.route("/reverify").post(authController.resendVerification);
Router.route("/verifyMe/:token").post(authController.verifyEmail);
Router.route("/verifyNewEmail/:currEmail/:newEmail/:token").post(
  authController.verifyNewEmail
);
// runs before the rest if the middle ware so it will protect
Router.use(authController.protect);
Router.route("/updatePassword").patch(authController.updatePassword);

Router.route("/me").get(userController.getMe, userController.getUser);
Router.route("/updateMe").patch(
  userController.uploadUserPhoto,
  userController.resizeProfilePhoto,
  userController.updateMe
);
Router.route("/deleteMe").delete(userController.deleteMe);

// ADMIN
// make sure its only admin that  has access to the user data
Router.use(authController.restrictTo("admin"));

Router.route("/")
  .get(userController.getAllUsers)
  .post(userController.creatUser);

Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
