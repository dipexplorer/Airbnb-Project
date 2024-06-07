const Listing = require("../models/listing.js");
const mongoose = require('mongoose');
const ExpressError = require('../utils/ExpressError.js');

module.exports.index = async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.showSingleListing = async (req, res, next) => {
    let { id } = req.params;
    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ExpressError(400, "Invalid listing ID"));
    };
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    if (!listing) {
        req.flash("error", "No listing found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
    // console.log(listing);
};

module.exports.addNewListing = async (req, res, next) => {
    if (!req.body.listings) {
        throw new ExpressError("Please fill in the form", 400);
    }
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = new Listing(req.body.listings);
    listing.owner = req.user._id;
    listing.image = { url, filename };
    // console.log(listing);
    await listing.save();
    //flash using flash
    req.flash("success", "New Listing is Created");
    res.redirect("/listings");
};

module.exports.renderUpdateForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "this listing is not available");
        res.redirect("/listing");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300");
    res.render("listings/update.ejs", { listing, originalImageUrl });
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    req.flash('success', 'listing deleted');
    res.redirect("/listings");
};

module.exports.updateListing = async (req, res) => {
    // if (!req.body.listings) {
    //     throw new ExpressError("Please fill in the form", 400);
    // }
    // console.log(req.body.listings);
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listings });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    // Use backticks (`) for the redirect URL
    req.flash('success', 'Listing updated successfully');
    res.redirect(`/listings/${id}`);
};