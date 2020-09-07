// import express and fs
const express = require("express");
const notes = require("./data/notes");
const fs = require("fs");
const path = require("path");

//set next id
let nextId = 1;
if (notes.length > 0) {
    nextId += notes[notes.length-1].id
}

console.log('nextId: ', nextId);

// create an express server
const app = express();

// setup express middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setting middleware for handeling index.js and style.css
app.use(express.static('public')); //Serves resources from public folder

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
    const b = req.body;

    const newNote = {
        title: b.title,
        text: b.text,
        id: nextId
    }

    nextId ++; // increment id

    notes.push(newNote);
    console.log('notes: ', notes);

    saveNotes();
    res.json({ok : true});
});

app.delete("/api/notes/:id", function(req, res) {
    console.log('req.params: ', req.params);
    const id = req.params.id;
    console.log('id: ', id);
    const index = notes.findIndex(cur => cur.id == id);
    console.log('index: ', index);
    notes.splice(index,1);
    saveNotes();
    res.json({ok: true});
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


