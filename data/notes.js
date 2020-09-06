// get fs to read db.jsom file
const fs = require("fs");

// read the file and store it in notes
const notes = JSON.parse(fs.readFileSync("db/db.json",)) || [];
console.log('notes: ', notes);

module.exports = notes;