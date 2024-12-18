const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listings = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


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

app.get("/", (request, response) => {
    response.send("I am groot!!!")
});

app.get("/testListing", async (request, response) => {
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
})

app.get("/listing", async (request, response) => {
    let allListings = await listings.find({});
    response.render("listing/index.ejs", { allListings});
})

app.get("/listing/new", (request, response) => {
    response.render("listing/new.ejs");
})

app.get("/listings/:id", async (request, response) => {
    let { id } = request.params;
    const listing = await listings.findById(id);
    response.render("listing/show.ejs", { listing });
})

app.post("/listing", async (request, response) => {
    let newListing = new listings(request.body);
    await newListing.save();
    response.redirect("/listing");
});

app.get("/listing/:id/edit", async (request, response) => {
    let { id } = request.params;
    const listing = await listings.findById(id);
    response.render("listing/edit.ejs", {listing});
});

app.put("/listings/:id", async (request, response) => {
    let { id } = request.params;
    let editedListing = request.body.Listing;
    await listings.findByIdAndUpdate(id, {...editedListing})
    response.redirect(`/listings/${id}`);
})
app.delete("/listings/:id", async (request, response) => {
    let { id } = request.params;
    let deletedListing = await listings.findByIdAndDelete(id);
    console.log(deletedListing);
    response.redirect("/listing");
})

app.listen(port, () => {
    console.log(`Your app is listening at ${port}`);
})