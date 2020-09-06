const notes = require("../data/notes");
const fs = require("fs");
const path = require("path");

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

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    app.post("/api/notes", function(req, res) {
        notes.push(req.body);
        saveNotes();
    });

    app.delete("/api/notes/:id", function(req, res) {
        const id = req.params.id;
        const index = notes.findIndex(cur => cur.id === id);
        notes.splice(index,1);
        saveNotes();
    });
}

