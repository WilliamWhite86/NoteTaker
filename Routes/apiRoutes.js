// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on notes.
// ===============================================================================

const fs = require("fs");
const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.


  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
      res.json(JSON.parse(data));
    });
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.

  app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      let newNote = req.body;
      //let id = Math.floor(Math.random() * 1000);
      let notesArr = (JSON.parse(data));
      let id = notesArr[notesArr.length - 1].id + 1;
      newNote.id = id;
      notesArr.push(newNote);
      //req.body + `{"id":"${id}"}`);
      let notesString = JSON.stringify(notesArr);
      console.log(typeof notesString);
      fs.writeFileSync(path.join(__dirname, "../db/db.json"), notesString)
    });
  });

  // API DELETE Requests
  // Below code handles when a user submits a form and thus submits data to the server.

  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      console.log(req.params.id);
      //console.log(JSON.parse(data));
      let notesArr = (JSON.parse(data));
      let newNotesArr = []
      for (i = 0; i < notesArr.length; i++) {
        if (notesArr[i].id != req.params.id) {
          newNotesArr.push(notesArr[i]);
        }
      }
      console.log(newNotesArr);
      let notesString = JSON.stringify(newNotesArr);
      console.log(notesString);
      fs.writeFileSync(path.join(__dirname, "../db/db.json"), notesString)
    })
  })
};
