// import express and fs
var express = require("express");
var fs = require("fs");

// create an express server
var app = express();

// set port
var PORT = process.env.PORT || 8080;

// setup express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes -------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// listener
app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
})


