var path = require("path");
var noteData = require("./noteData");

// ===============================================================================
// HTML ROUTES
// ===============================================================================

module.exports = function(app) {
  app.get("/notes", function(req, res) {
    console.log(path.join(__dirname, "../public/notes.html"));
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/", function(req, res) {
    console.log(path.join(__dirname, "../public/notes.html"));
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    console.log(path.join(__dirname, "../public/notes.html"));
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

// ===============================================================================
// API ROUTES
// ===============================================================================


  // API GET Requests
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  // API POST Requests
  app.post("/api/notes", function(req, res) {
    if (noteData.length < 5) {
      noteData.push(req.body);
      res.json(true);
    }
  });

  // Reset All Data **REMOVE BEFORE FINAL**
  app.post("/api/reset", function(req, res) {
    noteData.length = 0;
    res.json({ ok: true });
  });
};
