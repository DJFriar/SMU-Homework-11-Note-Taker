var path = require("path");
var noteData = require("./noteData");



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
