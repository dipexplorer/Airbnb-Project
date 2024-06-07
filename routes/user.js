const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require("passport");
// const ExpressError = require('../utils/ExpressError.js');
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");
const userController = require('../controllers/users.js')

router.route('/signup')
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));

router.route('/login')
    .get(userController.renderLogInForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
        userController.logIn);

router.get("/logout", isLoggedIn, userController.logOut);

module.exports = router;