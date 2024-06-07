const mongoose = require('mongoose');
// const Schema=mongoose.Schema;
// const Model=mongoose.model;
const Review = require('./review.js');
const User = require('./user.js');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {
    //     type: String,
    //     default: "https://rb.gy/m0qyfj",
    //     set: (v) => {
    //         return v === "" ? "https://rb.gy/m0qyfj" : v;
    //     }
    // }
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

//middleware to delete reviews 
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        })
    }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;