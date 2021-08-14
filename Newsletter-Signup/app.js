//defined modules used
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

//initialised Express
const app = express();

//defined app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//app will listen on port 3000 - localhost
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})