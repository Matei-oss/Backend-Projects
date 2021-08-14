const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, resp) {
    resp.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, resp) {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = Math.round(weight / (height * height));

    resp.send("Your BMI is " + bmi);
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});