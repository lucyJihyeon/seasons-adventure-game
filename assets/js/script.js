var mapsApi = "AIzaSyBLylZUYb0UAI4-mRgItl36-bf6IlPMMxI";
var weatherApi = "bd198fc2c921dcda5323e5669a78656f";
var googlemapsUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  mapsApi +
  "&callback=initMap";
var initLat = "51.508742";
var initLng = "-0.120850";
var selectbtn = document.getElementById("select-btn");
var scoresBtn = document.getElementById("scores-btn");
var promptEl = document.getElementById("not-selected");
var startbtn = document.getElementById("start-btn");
var initscore = 0;

function getParams(event) {
  event.preventDefault();

  var city = document.getElementById("dark_select").value;
  var userName = document.getElementById("dark_field").value;
  console.log(city);
  if ((!city) || (!userName)) {
    promptEl.textContent = "Please Enter Your name and Select a city to begin!";
    return;
  }
  var owUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherApi +
    "&units=imperial";
  searchCity(owUrl);
}

function searchCity(owUrl) {
  promptEl.textContent = "";
  fetch(owUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      if (data) {
        console.log(data);
        var coorLat = data.coord.lat;
        var coorLon = data.coord.lon;
        var cityName = data.name;
        var weather = data.weather[0].main;
        var temp = data.main.temp;
        var userName = document.getElementById("dark_field").value;
        initMap(coorLat, coorLon);
        getWeather(cityName, weather, temp, userName);
      }
    });
}

function initMap(coorLat, coorLon) {
  var city = document.getElementById("dark_select").value;
  initLat = coorLat;
  initLng = coorLon;
  var mapOption = {
    center: new google.maps.LatLng(initLat, initLng),
    zoom: 10,
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOption);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(initLat, initLng),
    map: map,
    title: city,
  });
}

function getWeather(name, weatherDsc, temp, username) {
  var weatherUl = document.getElementById("weather-widget");
  weatherUl.innerHTML = "";
  var cityName = document.createElement("li");
  cityName.setAttribute("id", "city-name");
  cityName.textContent = name;

  var weatherDscr = document.createElement("li");
  weatherDscr.setAttribute("id", "weather-description");
  weatherDscr.textContent = weatherDsc;

  var temperature = document.createElement("li");
  temperature.setAttribute("id", "temperature");
  temperature.textContent = temp + " °F";

  weatherUl.appendChild(cityName);
  weatherUl.appendChild(temperature);
  weatherUl.appendChild(weatherDscr);
  
  var newUser = {
    name: username,
    city: name,
    score: initscore,
    weather: weatherDsc,
  }
  savetoLocalStorage(newUser);
  addBackground(weatherDsc);
}

function savetoLocalStorage(userinfo) {
  var userName = document.getElementById("dark_field").value;
  localStorage.setItem(userName, JSON.stringify(userinfo));
}

function addBackground(weather) {
  var background = document.getElementById("weather");
  if (
    weather.toLowerCase().includes("clouds") ||
    weather.toLowerCase().includes("haze") ||
    weather.toLowerCase().includes("smoke") ||
    weather.toLowerCase().includes("mist") ||
    weather.toLowerCase().includes("dust") ||
    weather.toLowerCase().includes("fog") ||
    weather.toLowerCase().includes("sand") ||
    weather.toLowerCase().includes("ash") ||
    weather.toLowerCase().includes("squall") ||
    weather.toLowerCase().includes("tornado")
  ) {
    background.style.backgroundImage = "url('./assets/img/clouds.jpeg')";
  } else if (weather.toLowerCase().includes("thunderstorm")) {
    background.style.backgroundImage = "url('./assets/img/thunderstorm.jpeg')";
  } else if (weather.toLowerCase().includes("clear")) {
    background.style.backgroundImage = "url('./assets/img/sunny.jpeg')";
  } else if (weather.toLowerCase().includes("snow")) {
    background.style.backgroundImage = "url('./assets/img/winter.jpeg')";
  } else if (
    weather.toLowerCase().includes("drizzle") ||
    weather.toLowerCase().includes("rain")
  ) {
    background.style.backgroundImage = "url('./assets/img/raining.jpeg')";
  }
}


function startGame(event) {
  event.preventDefault();
  var userName = document.getElementById("dark_field").value;
  var queryString = "./start.html?q=" +  userName;
  location.assign(queryString);
}



selectbtn.addEventListener("click", getParams);
startbtn.addEventListener("click", startGame);
scoresBtn.addEventListener("click", () => location.assign("scores.html"))
