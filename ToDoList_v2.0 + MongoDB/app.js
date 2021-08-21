//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const { render } = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/ToDoListDB", { useNewUrlParser: true });

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully saved default items to db!")
    }
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    Item.find({}, function(err, foundItems) {
        console.log(foundItems);
        res.render("list.ejs", { listTitle: "Today", newListItem: foundItems });
    })

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