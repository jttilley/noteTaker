// import express and fs
const express = require("express");
const notes = require("./data/notes");
const fs = require("fs");
const path = require("path");

// create an express server
const app = express();

// setup express middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setting middleware for handeling index.js and style.css
app.use(express.static('public')); //Serves resources from public folder

// set port
var PORT = process.env.PORT || 8080;



// routes -------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// listener
app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
})


