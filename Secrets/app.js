//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = {
    email: String,
    password: String
}

const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


///GET METHODS///
app.get("/", function(req, res) {
    res.render("home.ejs");
})

app.get("/login", function(req, res) {
    res.render("login.ejs");
})

app.get("/register", function(req, res) {
    res.render("register.ejs");
})

///POST METHODS///

app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err) {
        if (err) {
            console.log(err)
        } else {
            res.render("secrets.ejs")
        }
    });
    console.log(newUser);
});

app.listen(3000, function() {
    console.log("Server started on port 3000.")
});