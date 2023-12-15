//Api keys 
var mapsApi = "AIzaSyBLylZUYb0UAI4-mRgItl36-bf6IlPMMxI";
var weatherApi = "bd198fc2c921dcda5323e5669a78656f";
var googlemapsUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  mapsApi +
  "&callback=initMap";
var initLat = "51.508742";
var initLng = "-0.120850";
var selectbtn = document.getElementById("select-btn");
var promptEl = document.getElementById("not-selected");
var startbtn = document.getElementById("start-btn");
//initial score set up to 0
var initscore = 0;

//Function to get user input and initiate the weather search 
function getParams(event) {
  event.preventDefault();
  //Get the city name and user name from user input 
  var city = document.getElementById("dark_select").value;
  var userName = document.getElementById("dark_field").value;
  console.log(city);
  //Display a prompt if either city or username is not entered
  if ((!city) || (!userName)) {
    promptEl.textContent = "Please Enter Your name and Select a city to begin!";
    return;
  }
  //API URL for OpenWeather Map 
  var owUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherApi +
    "&units=imperial";
    //call the searchCity function 
  searchCity(owUrl);
}

//Function to fetch weather data from open weather map
function searchCity(owUrl) {
  //empty the prompt if the user enter their name/city correctly 
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
        //Extract relevant weather data and call functions to display it 
        var coorLat = data.coord.lat;
        var coorLon = data.coord.lon;
        var cityName = data.name;
        var weather = data.weather[0].main;
        var temp = data.main.temp;
        var userName = document.getElementById("dark_field").value;
        //call initMap to display the city 
        initMap(coorLat, coorLon);
        //call getWeather to display weather information in the weather widget
        getWeather(cityName, weather, temp, userName);
      }
    });
}

function initMap(coorLat, coorLon) {
  var city = document.getElementById("dark_select").value;
  initLat = coorLat;
  initLng = coorLon;
  //Google Maps configuration 
  var mapOption = {
    center: new google.maps.LatLng(initLat, initLng),
    zoom: 10,
  };
//Create a new Google Map and marker 
  var map = new google.maps.Map(document.getElementById("map"), mapOption);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(initLat, initLng),
    map: map,
    title: city,
  });
}

//Function to display weather information retrieved from the open weather map 
function getWeather(name, weatherDsc, temp) {
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
  //Call function to set background based on the weather 
  addBackground(weatherDsc);
}

//Function to save user information to local storage
function savetoLocalStorage(userinfo) {
  var userName = document.getElementById("dark_field").value;
  localStorage.setItem(userName, JSON.stringify(userinfo));
}
//Functino to set background based on the weather description
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

//Functino to start the game 
function startGame(event) {
  event.preventDefault();
  var userName = document.getElementById("dark_field").value;
  var city = document.getElementById("dark_select").value;
  //API URL for OpenWeather Map
  var owUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherApi +
    "&units=imperial";

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
        var cityName = data.name;
        var weather = data.weather[0].main;
        //Extract relevant weather data and create a new user object to save into the localStorage
        var newUser = {
          name: userName,
          city: cityName,
          score: initscore,
          weather: weather
        }
      }

  //Get the existing user information from the local storage. If empty, create a new empty array 
  var userInformations = JSON.parse(localStorage.getItem("userInfos")) || [];
  //Add the new user object to the array 
  userInformations.push(newUser);
  //Save the updated array to the localStorage
  localStorage.setItem("userInfos", JSON.stringify(userInformations));
  //save the new user object to the local storage separately 
  savetoLocalStorage(newUser);
  //redirect the user to the game start page with their user information as parameters.
  var queryString = "./start.html?q=" +  userName;
  location.assign(queryString);
})
}


//When selectBtn is clicked, call getParams
selectbtn.addEventListener("click", getParams);
//When startbtn is clicked, call startGame.
startbtn.addEventListener("click", startGame);

