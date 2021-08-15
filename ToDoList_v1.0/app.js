//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");

const app = express();

var items = ["Todo Example - 1", "Todo Example - 2"];

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    var today = new Date();


    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list.ejs", { kindOfDay: day, newListItem: items });
});

app.post("/", function(req, res) {
    var item = req.body.newItem;
    items.push(item);
    console.log(item);
    res.redirect("/");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})