var path = require("path");
var fs = require("fs");
let noteData = require('../db/db.json');

module.exports = function(app) {
  // ===============================================================================
  // API ROUTES
  // ===============================================================================

  // API GET Requests
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  // API POST Requests
  app.post("/api/notes", function(req, res) {
    noteData.push(req.body);
    var inputtedData = JSON.stringify(noteData);
    fs.writeFile('./db/db.json', inputtedData, 'utf8', err => err ? console.log(err) : console.log("DB Updated"));
    res.json(req.body);
  });

  // Reset All Data **REMOVE BEFORE FINAL**
  app.post("/api/reset", function(req, res) {
    noteData.length = 0;
    res.json({ ok: true });
  });

  // ===============================================================================
  // HTML ROUTES
  // ===============================================================================

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
