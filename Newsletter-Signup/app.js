//defined modules used
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { response } = require("express");
const { json } = require("body-parser");

//initialised Express
const app = express();

//reffer static files - css images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//load html page on server
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {


    //defined const got from sign-up form
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    //defined data that will be posted on MailChimp
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };
    //jsonified data that will be posted
    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/9c39975fb2"
    const options = {
        method: "POST",
        auth: "amateiu:"
    }
    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    if (response.error_count === 0) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
    request.write(jsonData);
    request.end();

    console.log(firstName, lastName, email);
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

//app will listen on port 3000 - localhost
app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})