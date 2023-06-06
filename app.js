// // Pre-defined packages we will use to app
// const express = require ("express");
// const app = express();
// const bodyParser = require ("body-parser")
// const https = require ("https");
// const { json } = require("body-parser");

// // Here created our route for URL to Page.html
// app.use(bodyParser.urlencoded({extended:true}))
// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/page.html")


// });

// // Here we will implement out API call to our url 

// app.post("/", function(req,res){
// const cityName = req.body.cityName;
// const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.2271&lon=-80.8431&appid=6a89cd9bff41591a2914a658fb6c1b39&units=imperial`
// https.get(url,function(response){response.on("data",function(data){
//     const jsondata = JSON.parse(data);
//     console.log(jsondata)
//     const temp = jsondata.main.temp;
//     const des = jsondata.weather[0].description;
//     const icon = jsondata.weather[0].icon;
//     const imageurl ="http://openweathermap.org/img/wn/" + icon + "@2x.png";
//     res.write(`<h1>The Temp in ${cityName} is ${temp} degrees</h1>`)
//     req.write(`<p>The weather description ${des}</p>`)
//     req.write("<img src = " + imageurl +  ">")
// })})
// })

// app.listen(9000);
// ////////////////// ////////////////// ////////////////// ////////////////



const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});
app.post("/", function (req, res) {
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
      res.send();
    });
  });
});
app.listen(9000);