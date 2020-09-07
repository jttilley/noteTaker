const notes = require("../data/notes");
const fs = require("fs");
const path = require("path");



module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    app.post("/api/notes", function(req, res) {
        console.log(req.body);
        const b = req.body;
    
        const newNote = {
            title: b.title,
            text: b.text,
            id: id
        }
    
        id ++; // increment id
    
        notes.push(newNote);
        console.log('notes: ', notes);
    
        saveNotes();
        return res(true);
    });

    app.delete("/api/notes/:id", function(req, res) {
        const id = req.params.id;
        const index = notes.findIndex(cur => cur.id === id);
        notes.splice(index,1);
        saveNotes();
    });
}

