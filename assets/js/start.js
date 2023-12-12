var time = dayjs().format("hh : mm A");
var greeting = document.getElementById("name");
var weather = document.getElementById("weather");
var intro = document.getElementById("intro");
var nodeOne = document.getElementById("node-1");
var nodeStory = document.getElementById("story");
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
  nodeStory.textContent = "Your path diverges into two roads. One road is covered with a tree canopy, while the other is open and exposed to the elements.";
  option1.textContent = "Walk along the covered road" ;
  option2.textContent = "Brave the exposed road";
  option1.style.animation = "typing 2s steps(" + option1.textContent.length ;
  option2.style.animation = "typing 2s steps(" + option2.textContent.length ;

  getlives(heartNum);

  option1.addEventListener("click", nextQuestionWrong);
}

function getlives(heartNum) {
  iconContainer.innerHTML = "";
  for (var i = 0; i < heartNum; i ++)  {
    var heart = document.createElement("i");
    heart.classList.add("nes-icon", "is-medium", "heart");
    iconContainer.appendChild(heart);
  }
}

function nextQuestionWrong(event)  {
  event.preventDefault();
  heartNum -= 1;
  getlives(heartNum);
  nodeStory.textContent = "Oh No! You find yourself in the Enchanted Forest, a place of magic and mystery. While exploring, a massive dragon appears. Its scales glow with an eerie darkness, and it speaks directly to you."
  +
  "Adventurer, you've entered my domain. Brace yourself!";
  option1.textContent = "Stand your ground and prepare to fight the dragon!" ;
  option2.textContent = "Try to calm the dragon down with soothing words.";


}



