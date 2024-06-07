const Listing = require('./models/listing');
const ExpressError = require('./utils/ExpressError.js');
const { reviewSchema, listingSchema } = require('./schema.js');
const Review = require('./models/review.js');


module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path, ",,,,", req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.cntUsr._id)) {
        req.flash('error', 'you are not the owner of this listing');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    // console.log('Request body:', req.body);  // Debugging line
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    console.log('Request body:', req.body);  // Debugging line
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
};

module.exports.isReviewOwner = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.cntUsr._id)) {
        req.flash('error', 'you are not the owner of this Review');
        return res.redirect(`/listings/${id}`);
    }
    next();
};