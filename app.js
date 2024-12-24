const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listings = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpreeError = require("./utils/ExpressError.js");
const ExpressError = require("./utils/ExpressError.js");
const listingschema = require("./schema.js")


const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(() => {
    console.log("Connection has been established");
}).catch((error) => {
    console.log(error)
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const validateListing = (request, response, next) => {
    let {error} = listingSchema.validate(request.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, ereMsg);
    } else {
        next();
    }
}

app.get("/", (request, response) => {
    response.send("I am groot!!!")
});

app.get("/testListing", wrapAsync(async (request, response) => {
    let sampleListing = new listings({
        title: "My new Villa",
        description: "By the beach",
        price: 1200,
        location: "San Marcos",
        country: "India",
    });
    await sampleListing.save();
    console.log("Sample was saved");
    response.send("Testing Successful")
}))

app.get("/listing", wrapAsync(async (request, response) => {
    let allListings = await listings.find({});
    response.render("listing/index.ejs", { allListings });
}));

app.get("/listing/new", (request, response) => {
    response.render("listing/new.ejs");
})

app.get("/listings/:id", wrapAsync(async (request, response) => {
    let { id } = request.params;
    const listing = await listings.findById(id);
    response.render("listing/show.ejs", { listing });
}));

app.post("/listing",validateListing, wrapAsync(async (request, response) => {
    let newListing = new listings(request.body);
    await newListing.save();
    response.redirect("/listing");
}));

app.get("/listing/:id/edit", wrapAsync(async (request, response) => {
    let { id } = request.params;
    const listing = await listings.findById(id);
    response.render("listing/edit.ejs", {listing});
}));

app.put("/listings/:id", validateListing, wrapAsync(async (request, response) => {
    let { id } = request.params;
    let editedListing = request.body.Listing;
    await listings.findByIdAndUpdate(id, { ...editedListing })
    response.redirect(`/listings/${id}`);
}));

app.delete("/listings/:id", wrapAsync(async (request, response) => {
    let { id } = request.params;
    let deletedListing = await listings.findByIdAndDelete(id);
    console.log(deletedListing);
    response.redirect("/listing");
}));

app.all("*", (request, response, next) => {
    next(ExpreeError(404, "Page not found!!!"))
})

app.use((error, request, response, next) => {
    let { statusCode = 500, message = "Something went wrong"} = error;
    response.status(statusCode).render("listing/error.ejs", {error});
}
)

app.listen(port, () => {
    console.log(`Your app is listening at ${port}`);
})