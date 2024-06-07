const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
// const { reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const Review = require('../models/review.js');
const { isLoggedIn, validateReview, isReviewOwner } = require("../middleware.js");
const reviewController = require('../controllers/reviews.js');

//review
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.addReview));

//delete review
router.delete("/:reviewId", isLoggedIn, isReviewOwner, wrapAsync(reviewController.deleteReview));

module.exports = router;