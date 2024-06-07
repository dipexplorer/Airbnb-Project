if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
// console.log(process.env.SECRECT);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodeOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const wrapAsync = require('./utils/wrapAsync.js');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const localStretegy = require('passport-local');

//require listing model
const Listing = require('./models/listing.js');
const Review = require('./models/review.js');
const User = require('./models/user.js');

//schema validation
const { listingSchema } = require('./schema.js');
const { reviewSchema } = require('./schema.js');

//require routes
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodeOverride("_method"));

app.engine("ejs", ejsMate);

// DB URL
// const dbUrl = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.MONGO_ATLAS;

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
};

//mongo sessions
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (e) => {
    console.log("session store error", e);
});

//sessions options
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

//passport initialize
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStretegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//use flash
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    // console.log(res.locals.success);
    res.locals.cntUsr = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "somethis is went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", { message });
    // console.log(message);
});

app.listen("8080", () => {
    console.log("port res is listend on port 8080");
});