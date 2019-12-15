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
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------



  app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
      res.json(JSON.parse(data));
    });
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      let notesObj = (JSON.parse(data));
      notesObj.push(req.body);
      let notesString = JSON.stringify(notesObj);
      console.log(typeof notesString);
      fs.writeFileSync(path.join(__dirname, "../db/db.json"), notesString)
      

    });      
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // req.body is available since we're using the body parsing middleware
    //console.log(req.body)
    //notesData.push(req.body);
  });
};