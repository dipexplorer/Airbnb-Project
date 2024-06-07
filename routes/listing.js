const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const mongoose = require('mongoose');
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const { listingSchema } = require('../schema.js');
// console.log(listingSchema);
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require('../cloudconfig.js');
const upload = multer({ storage });

//using router.route show all listing
//add new listing
router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listings[image]'), validateListing, wrapAsync(listingController.addNewListing));
// .post(upload.single('listings[image]'), (req, res) => {
//     console.log(req.body);
//     res.send(req.file);
// })

//render new form 
router.get('/new', isLoggedIn, wrapAsync(listingController.renderNewForm));

//show single listing
router.route('/:id')
    .get(wrapAsync(listingController.showSingleListing))
    //delete listing
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))
    //update the exisitng listings
    .put(isLoggedIn, isOwner, upload.single('listings[image]'), validateListing, wrapAsync(listingController.updateListing));

//render update form
router.get('/:id/edit', isOwner, wrapAsync(listingController.renderUpdateForm));

//show all listing
// router.get('/', wrapAsync(listingController.index));

//show single listing
// router.get("/:id", wrapAsync(listingController.showSingleListing));

//add new listing
// router.post('/', isLoggedIn, validateListing, wrapAsync(listingController.addNewListing));

//delete listing
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//update the exisitng listings
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

module.exports = router;