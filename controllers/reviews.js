const Listing = require('../models/listing');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError.js');


module.exports.addReview = async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    // console.log(req.body.review.rating);
    if (req.body.review.rating == 0) {
        throw new ExpressError(400, 'Rating must be between 1 and 5');
    };
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log("author is", newReview.author);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log(listing);
    req.flash('success', 'new Review created');
    res.redirect(`/listings/${listing.id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    let review = await Review.findByIdAndDelete(reviewId);
    console.log(review);
    req.flash('success', "review deleted");
    res.redirect(`/listings/${id}`);
};