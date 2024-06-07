const User = require("../models/user.js");


module.exports.renderSignUpForm = (req, res, next) => {
    res.render("users/signUp.ejs");
};

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        //automaticlly redirected after registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'welcome to Wanderlust');
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogInForm = (req, res, next) => {
    res.render('users/login.ejs');
};

module.exports.logIn = async (req, res, next) => {
    req.flash('success', "Welcome back to wanderlust! You are logged in successfully!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "ur are logout successfully!");
        res.redirect("/listings");
    })
};