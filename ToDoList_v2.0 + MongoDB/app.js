//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();

var items = ["Todo Example - 1", "Todo Example - 2"];
var workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    let day = date.getDate();
    res.render("list.ejs", { listTitle: day, newListItem: items });
});

app.post("/", function(req, res) {
    var item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/")
    }
    console.log(item);
})

app.get("/work", function(req, res) {
    res.render("list.ejs", { listTitle: "Work List", newListItem: workItems });
})

app.get("/about", function(req, res) {
    res.render("about.ejs");
})

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})