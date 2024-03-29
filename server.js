
const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8080;

// stringify

// parse, push, stringify

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./Routes/apiRoutes")(app);
require("./Routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  


