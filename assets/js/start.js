var time = dayjs().format("hh : mm A");
var greeting = document.getElementById("name");
var weather = document.getElementById("weather");
var intro = document.getElementById("intro");
var nodeOne = document.getElementById("node-1");
var option1 = document.getElementById("option-1");
var option2 = document.getElementById("option-2");
var iconContainer = document.getElementById("icon-container");
var heartNum = 5;
getname();

function getname() {
  var searchParams = document.location.search.split("q=");
  var user = searchParams[1];
  getintro(user);
}

function getintro(user) {
  var daynight = dayjs().format("A");
  var morning = dayjs().format("h");
  var time = parseInt(morning);
  var userinfo = JSON.parse(localStorage.getItem(user));
  var currentW = userinfo.weather;
  var userCity = userinfo.city;

  if (daynight == "AM") {
    greeting.textContent = "Good Morning, " + user;
  } else if (daynight == "PM" && time < 6) {
    greeting.textContent = "Good Afternoon, " + user;
  } else if (daynight == "PM" && time > 6) {
    greeting.textContent = "Good Night, " + user;
  }

  if (
    currentW.toLowerCase().includes("clouds") ||
    currentW.toLowerCase().includes("haze") ||
    currentW.toLowerCase().includes("smoke") ||
    currentW.toLowerCase().includes("mist") ||
    currentW.toLowerCase().includes("dust") ||
    currentW.toLowerCase().includes("fog") ||
    currentW.toLowerCase().includes("sand") ||
    currentW.toLowerCase().includes("ash") ||
    currentW.toLowerCase().includes("squall") ||
    currentW.toLowerCase().includes("tornado")
  ) {
    currentW = "overcast";
    startOvercast();
  } else if (currentW.toLowerCase().includes("thunderstorm")) {
    currentW = "stormy";
    startStormy();
  } else if (currentW.toLowerCase().includes("clear")) {
    currentW = "sunny";
    startSunny();
  } else if (currentW.toLowerCase().includes("snow")) {
    currentW = "snowy";
    startSnowy();
  } else if (
    currentW.toLowerCase().includes("drizzle") ||
    currentW.toLowerCase().includes("rain")
  ) {
    currentW = "raining";
    startRain();
  }

  weather.textContent = "It is currently " + currentW + " In " + userCity;
}

function startRain() {}

function startSunny() {
  var node = document.createElement("p");
  node.textContent = 
    "Your path diverges into two roads. One road is covered with a tree canopy, while the other is open and exposed to the elements.";
  nodeOne.insertBefore(node, nodeOne.firstChild);
  
  option1.textContent = "Walk along the covered road" ;
  option2.textContent = "Brave the exposed road";
  option1.style.animation = "typing 2s steps(" + option1.textContent.length ;
  option2.style.animation = "typing 2s steps(" + option2.textContent.length ;

  getlives();
}

function getlives() {
  for (var i = 0; i < heartNum; i ++)  {
    var heart = document.createElement("i");
    heart.classList.add("nes-icon", "is-medium", "heart");
    iconContainer.appendChild(heart);
  }
}



