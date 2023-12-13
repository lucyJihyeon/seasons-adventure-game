var time = dayjs().format("hh : mm A");
var greeting = document.getElementById("name");
var weather = document.getElementById("weather");
var intro = document.getElementById("intro");
var nodeOne = document.getElementById("node-1");
var nodeStory = document.getElementById("story");
var nodeStatus = document.getElementById("status");
var option1 = document.getElementById("option-1");
var option2 = document.getElementById("option-2");
var iconContainer = document.getElementById("icon-container");
var searchParams = document.location.search.split("q=");
var user = searchParams[1];
var heartNum = 3;

getintro(user);

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
    //change it to something else?
    currentW = "overcast";
    startRain(userCity);
  } else if (currentW.toLowerCase().includes("thunderstorm")) {
    currentW = "raining";
    startRain(userCity);
  } else if (currentW.toLowerCase().includes("clear")) {
    currentW = "sunny";
    startSunny(userCity);
  } else if (currentW.toLowerCase().includes("snow")) {
    currentW = "snowy";
    startSnowy(userCity);
  } else if (
    currentW.toLowerCase().includes("drizzle") ||
    currentW.toLowerCase().includes("rain")
  ) {
    currentW = "raining";
    startRain(userCity);
  }

  weather.textContent = "It is currently " + currentW + " In " + userCity;
}
function startRain(userCity) {
  nodeStory.textContent =
    " You stand at a rain-soaked intersection in " +
    userCity +
    "The city lights reflect off the wet pavement \n" +
    "A mysterious figure appears, inviting you on an unexpected adventure. ";
  nodeStatus.textContent =
    "The rain conceals secrets only the adventurer can uncover\n" +
    "Choose your path widely, and let city's whispers guide you.";
  option1.textContent =
    "Approach the mysterious figure and ask about the adventure";
  option2.textContent = "Explore the city streets on your own";

  option1.style.animation =
    "typing 2s steps(" + option1.textContent.length + ")";
  option2.style.animation =
    "typing 2s steps(" + option2.textContent.length + ")";

  getlives(heartNum);

  option2.addEventListener("click", rainynextQuestionWrong);
  option1.addEventListener("click", rainynextQuestionCorrect);
}

function rainynextQuestionWrong(event) {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);

  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "The mysterious figure furiously grabs your arm and looks at you with disappointment. \"I can't believe you'd make such a reckless decision, " +
    user +
    '. I thought you were the one."';
  nodeStatus.textContent = 
    "It left you with a bad taste in your mouth, but you decide to continue the journey. " + 
    "You walk down the street and see something in the distance that peaks your interest.";

  option1.textContent = "Enter a cafe with the swell of coffee filling the air.";
  option2.textContent = "continue down the main street and explore on your own.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option2.removeEventListener("click", rainynextQuestionWrong);
  option1.removeEventListener("click", rainynextQuestionCorrect);

  option1.addEventListener("click", rainynextQuestionWrong2A);
  option2.addEventListener("click", rainynextQuestionWrong2B);
}
function rainynextQuestionWrong2A(event)  {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);

  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
   "As you enter, you're surprised to see an old friend behind the counter." +
   "They work as a barista and notice you immediately."
  nodeStatus.textContent = 
   "\"Hey, " + user + "!\"" + "Your old friend, excited to see you, insists on making you a cup of coffee. It's on the house!";
  option1.textContent = "Gratefully accept the free cup of coffee.";
  option2.textContent = "Politely decline the offer and continue on your journey.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

option1.removeEventListener("click", rainynextQuestionWrong2A);
option2.removeEventListener("click", rainynextQuestionWrong2B);

option1.addEventListener("click", rainynextQuestionWrong2AFinal);
option2.addEventListener("click", rainynextQuestionWrong2BFinal);

}
function rainynextQuestionWrong2B(event)  {

}
function rainynextQuestionWrong2AFinal(event) {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);
  nodeStory.textContent = "The barista's disguise fades away, revealing the mysterious figure. It seems the free coffee was a trap!"
   
  nodeStatus.textContent = "\"You should've made a wiser choice " + user + "!\"\nThe mysterious figure's words echo in your mind as regret fills your heart. The poison takes its toll, and you feel an unbearable pain surging through your body. Your vision blurs, and you close your eyes slowly in pain."
  
  option1.removeEventListener("click", rainynextQuestionWrong2AFinal);
  option2.removeEventListener("click", rainynextQuestionWrong2BFinal);
  

  location.assign(game_end.html);
}





















function rainynextQuestionCorrect(event) {
  event.preventDefault();
  intro.innerHTML = "";
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    " \" I've been waiting for you, " +
    user +
    ". This key will unlock the secrets you seek.";
  nodeStatus.textContent =
    "The Mysterious Figure handed you a mysterious key.\n" +
    '"The city holds stories unhold.\n' +
    'Venture with me, and you may uncover the extra ordinary"';
  option1.textContent =
    "Follow the Mysterious Figure down a narrow, dark alley.";
  option2.textContent = "Leave the Mysterioius Figure and take his top hat";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.removeEventListener("click", rainynextQuestionCorrect);
  option2.removeEventListener("click", rainynextQuestionWrong);

  option1.addEventListener("click", rainynextQuestionWrong2);
  option2.addEventListener("click", rainynextQuestionCorrect2);
}

function startSunny() {
  nodeStory.textContent =
    "Your path diverges into two roads. One road is covered with a tree canopy, while the other is open and exposed to the elements.";
  option1.textContent = "Walk along the covered road";
  option2.textContent = "Brave the exposed road";

  option1.style.animation =
    "typing 2s steps(" + option1.textContent.length + ")";
  option2.style.animation =
    "typing 2s steps(" + option2.textContent.length + ")";

  getlives(heartNum);

  option1.addEventListener("click", sunnynextQuestionWrong);
  option2.addEventListener("click", sunnynextQuestionCorrect);
}

function getlives(heartNum) {
  iconContainer.innerHTML = "";
  for (var i = 0; i < heartNum; i++) {
    var heart = document.createElement("i");
    heart.classList.add("nes-icon", "is-medium", "heart");
    iconContainer.appendChild(heart);
  }
}

function sunnynextQuestionWrong(event) {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);

  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "Oh No! You find yourself in the Enchanted Forest, a place of magic and mystery. While exploring, a massive dragon appears. Its scales glow with an eerie darkness, and it speaks directly to you.\n" +
    '"Adventurer, you\'ve entered my domain. Brace yourself!"';
  option1.textContent = "Stand your ground and prepare to fight the dragon!";
  option2.textContent = "Try to calm the dragon down with soothing words.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.removeEventListener("click", sunnynextQuestionWrong);
  option2.addEventListener("click", sunnynextQuestionWrong2);
}
function sunnynextQuestionCorrect(event) {
  event.preventDefault();
  intro.innerHTML = "";

  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "Oh No! You find yourself in the Enchanted Forest, a place of magic and mystery. While exploring, a massive dragon appears. Its scales glow with an eerie darkness, and it speaks directly to you.\n" +
    '"Adventurer, you\'ve entered my domain. Brace yourself!"';
  option1.textContent = "Stand your ground and prepare to fight the dragon!";
  option2.textContent = "Try to calm the dragon down with soothing words.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  //option1.removeEventListener("click", sunnynextQuestionCorrect);
  //option2.addEventListener("click", sunnynextQuestionWrong2);
}

function sunnynextQuestionWrong2(event) {
  event.preventDefault();
  heartNum -= 1;
  getlives(heartNum);
}
