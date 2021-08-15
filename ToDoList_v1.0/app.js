//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res) {
    var today = new Date();

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.send("<h1>It's the weekend</h1>");
    } else {
        res.send("<h1>nope, not weekend</h1>");
    }
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
})