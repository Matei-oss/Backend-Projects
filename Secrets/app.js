//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption"); - MONGOOSE-ENCRYPTION
// const md5 = require("md5");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] }); - MONGOOSE-ENCRYPTION

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
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        newUser.save(function(err) {
            if (err) {
                console.log(err)
            } else {
                res.render("secrets.ejs")
            }
        });
        console.log(newUser);
    })

});

app.post("/login", function(req, res) {
    const userName = req.body.username;
    const password = req.body.password;

    console.log(password);

    User.findOne({ email: userName }, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if (result === true) {
                        res.render("secrets.ejs");
                    }
                });
            }
        }
    })
});

app.listen(3000, function() {
    console.log("Server started on port 3000.")
});