const express = require("express");
const https = require("https");

const app = express();

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
})

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=88b8424223e3f18e283b4facb5dcf87a&units=metric";

    https.get(url, function(response) {

        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(iconUrl);
            console.log(description);
            console.log("Temperature is " + temp);
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>Temperature in London is " + temp + " degrees Celsius.</h1>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        })
    })

})