const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/job"));
// get driver connection
const dbo = require("./db/conn");
// Accessing the path module
const path = require("path");

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});