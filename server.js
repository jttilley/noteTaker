// import express and fs
const express = require("express");
const notes = require("./data/notes");
const fs = require("fs");
const path = require("path");


// create an express server
var app = express();

// setup express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

// set port
var PORT = process.env.PORT || 8080;

const OUTPUT_DIR = path.resolve(__dirname, "db");
const outputPath = path.join(OUTPUT_DIR, "db.json");
console.log('OUTPUT_DIR: ', OUTPUT_DIR);
console.log('outputPath: ', outputPath);

const saveNotes = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, JSON.stringify(notes, null, 2), "utf-8");
};

// routes -------------------------
// require("./routes/apiRoutes")(app);
app.get("/api/notes", function(req, res) {
    res.json(notes);
});

app.post("/api/notes", function(req, res) {
    console.log(req.body);

    // notes.push(req.body);
    // saveNotes();
});

app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id;
    const index = notes.findIndex(cur => cur.id === id);
    notes.splice(index,1);
    saveNotes();
});

// require("./routes/htmlRoutes")(app);
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

// listener
app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
})


