const mongoose = require('mongoose');
const initDB = require('./data.js');
const Listing = require('../models/listing.js');

main().then(() => {
    console.log("connected to Mongo ");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    // console.log(initDB);
    // console.log('Data inserted');
};


const insertIntoDB = async () => {
    await Listing.deleteMany({});
    console.log('Data deleted');
    initDB.data = initDB.data.map((obj) => ({ ...obj, owner: "665c5887682b61daac2159dc" }));
    await Listing.insertMany(initDB.data);
    console.log('Data inserted');
};

insertIntoDB();