const express = require("express");
const app = express();

const path = require("path");

const axios = require("axios");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// public folder define
app.use(express.static('public'))
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
 

app.get("/", (req, res) => {
  let city, weather, temp;
  city = "";
  weather = "";
  temp = "";

  res.render("layout", { city: city, weather: weather, temperature: temp });
});

app.post("/weather-info", async (req, res) => {
  searchcity = req.body.location;

  //Api header
  const options = {
    method: "GET",
    url: `https://the-weather-api.p.rapidapi.com/api/weather/${searchcity}`,
    headers: {
      "X-RapidAPI-Key": "f1494d0684mshbacf0a251e7a71ap10b30ajsn233ce10fb6f1",
      "X-RapidAPI-Host": "the-weather-api.p.rapidapi.com",
    },
  };

  //Api response data capture
  const response = await axios.request(options);

  let loc = response.data.data.city;
  let weather = response.data.data.current_weather;
  let temp = response.data.data.temp;

  //Re Render layout with new data
  res.render("layout", { city: loc, weather: weather, temperature: temp });
});

app.listen(4000, () => console.log("server is on 3000"));
