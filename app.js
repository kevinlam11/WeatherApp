const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});
app.post("/city", function (req, res) {
  const cityName = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.2271&lon=-80.8431&appid=37f29f7631f9aec93c23685b2545c3c8&units=imperial`
  https.get(url, function (response) {
    response.on("data", function (data) {
      const jsondata = JSON.parse(data);
      const temp = jsondata.main.temp;
      const des = jsondata.weather[0].description;
      const icon = jsondata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
      res.write(`<p>The weather description is ${des} </p>`);
      res.write("<img src=" + imageurl + ">");
      res.write(`<a href="/"><button>go back</button></a>`)
      res.send();
    });
  });
});

app.post("/zipcode", function (req, res) {
    const zipcode = req.body.zipcode;
    const url = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + "&appid=37f29f7631f9aec93c23685b2545c3c8";
      https.get(url, function (response) {
      response.on("data", function (data) {
        if (response.statusCode !== 200){
            res.write(`<p>Something went wrong with zipcode ${data} </p>`);
            res.write(`<a href="/"><button>go back</button></a>`)
            res.write(`<p>${response.statusCode}</p>`);
            res.send();
        } else {
        const jsondata = JSON.parse(data);
        console.log(jsondata)
        const cityName = req.body.zipcode;
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + jsondata.lat + "&lon=" + jsondata.lon + "&appid=37f29f7631f9aec93c23685b2545c3c8&units=imperial"
         https.get(url, function (response) {
          response.on("data", function (data) {
            if (response.statusCode !== 200) {     
            res.write(`<p>Something went wrong with weather ${data} </p>`);
            res.write(`<a href="/"><button>go back</button></a>`)
            res.write(`<p>${response.statusCode}</p>`);
            // res.write(`${cityName}`)
            res.send();
            }else {
            const jsondata = JSON.parse(data);
            console.log(jsondata)
            const temp = jsondata.main.temp;
            const des = jsondata.weather[0].description;
            const icon = jsondata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(`<h1>The temp in ${cityName} is ${temp} degrees</h1>`);
            res.write(`<p>The weather description is ${des} </p>`);
            res.write("<img src=" + imageurl + ">");
            res.write(`<a href="/"><button>go back</button></a>`)
            res.send();
        }
          });
        });
    }
      })});
    });   






app.listen(9000);