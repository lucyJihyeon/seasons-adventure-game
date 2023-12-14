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
var userScore = 0;

getintro(user);

function getlives(heartNum) {
  iconContainer.innerHTML = "";
  for (var i = 0; i < heartNum; i++) {
    var heart = document.createElement("i");
    heart.classList.add("nes-icon", "is-medium", "heart");
    iconContainer.appendChild(heart);
  }
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
  } else if ((daynight == "PM" && time < 6) || (daynight == "PM" && time === 12)) {
    greeting.textContent = "Good Afternoon, " + user;
  } else if ((daynight == "PM" && time > 6) || (daynight == "AM" && time === 12)){
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
    startOvercast(userCity);
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
function startOvercast(userCity)  {

  nodeStory.textContent = "The sky hangs heavy with thick, gray clouds, casting a dim light over your surroundings. You find yourself in the midst of an overcast day, the air pregnant with the promise of rain. ";
  nodeStatus.textContent ="Caught between the uncertainty of impending rain and a subtle tension in the cloudy atmosphere, you must make a decision. What will you do? ";
  option1.textContent = "Stay in the current area and embrace the overcast ambiance.";
  option2.textContent ="Go to a location known for sudden rain showers.";
  option1.style.animation =
  "typing 2s steps(" + option1.textContent.length + ")";
  option2.style.animation =
  "typing 2s steps(" + option2.textContent.length + ")";

  getlives(heartNum);
  option1.addEventListener("click", ocLose);
  option2.addEventListener("click", function() {
  startRain(userCity);
  option1.removeEventListener("click", ocLose);
  option2.removeEventListener("click", function() {
    startRain(userCity);
    });
  });
}

function ocLose(event)  {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum = 0;
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", ocLose);

  nodeStory.textContent =
  "As you linger in the overcast atmosphere, a sudden and unforeseen weather disaster strikes. The calmness of the clouds quickly transforms into chaos. Violent winds whip through the area, and torrential rain begins to pour.";

  nodeStatus.textContent =
  "The sudden weather disaster proves too much to handle. Overwhelmed by the forces of nature, your journey comes to an abrupt and unfortunate end. Game Over.";
  option1.textContent = "Restart";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", restart);
  option2.addEventListener("click", viewScore);
}

function startRain(userCity) {
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
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

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  
  option1.removeEventListener("click",ocLose);
  option2.removeEventListener("click",() => startRain(userCity) );
  
  option1.addEventListener("click", rainynextQuestion1A);
  option2.addEventListener("click", rainynextQuestionWrong);
}

function rainynextQuestionWrong(event) {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);
  userScore += 5;
  option1.removeEventListener("click", rainynextQuestion1A);
  option1.removeEventListener("click",rainynextQuestion2A);
  option2.removeEventListener("click", rainynextQuestionWrong);
  
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "The mysterious figure furiously grabs your arm and looks at you with disappointment. \"I can't believe you'd make such a reckless decision, " +
    user +
    '. I thought you were the one."';
  nodeStatus.textContent =
    "It left you with a bad taste in your mouth, but you decide to continue the journey. " +
    "You walk down the street and see something in the distance that peaks your interest.";

  option1.textContent =
    "Enter a cafe with the swell of coffee filling the air.";
  option2.textContent =
    "continue down the main street and explore on your own.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", rainynextQuestionWrong2A);
  option2.addEventListener("click", rainynextQuestion2BFianl);
}

function rainynextQuestionWrong2A(event) {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  userScore += 5;
  getlives(heartNum);
  option1.removeEventListener("click", rainynextQuestionWrong2A);
  option2.removeEventListener("click", rainynextQuestion1A);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "As you enter, you're surprised to see an old friend behind the counter." +
    "They work as a barista and notice you immediately. \n He is also very surprised that he spills some hot coffee on you";
  nodeStatus.textContent =
    "\"I am so sorry " +
    user +
    "! Your old friend feels so bad, insists on making you a cup of coffee. It's on the house!";
  option1.textContent = "Gratefully accept the free cup of coffee.";
  option2.textContent =
    "Politely decline the offer and continue on your journey.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", rainynextQuestionWrong2bFinal);
  option2.addEventListener("click", rainynextQuestion2BFianl);
}
function rainynextQuestionWrong2bFinal(event) {
  event.preventDefault();
  heartNum = 0;
  userScore += 10;
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainynextQuestionWrong2bFinal);
  option2.removeEventListener("click", rainynextQuestion2BFianl);

  nodeStory.textContent =
    "The barista's disguise fades away, revealing the mysterious figure. It seems the free coffee was a trap!";

  nodeStatus.textContent =
    "\"You should've made a wiser choice " +
    user +
    "!\"\nThe mysterious figure's words echo in your mind as regret fills your heart. The poison takes its toll, and you feel an unbearable pain surging through your body. Your vision blurs, and you close your eyes slowly in pain.";

  option1.textContent = "Restart";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", restart);
  option2.addEventListener("click", viewScore);
}

function rainynextQuestion1A(event) {
  event.preventDefault();
  intro.innerHTML = "";
  option1.style.animation = "";
  option2.style.animation = "";
  userScore += 10;
  option1.removeEventListener("click", rainynextQuestion1A);
  option2.removeEventListener("click", rainynextQuestionWrong);

  nodeStory.textContent =
    " \" I've been waiting for you, " +
    user +
    '. This key will unlock the secrets you seek."';
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

  option1.addEventListener("click", rainynextQuestion2A);
  option2.addEventListener("click", rainynextQuestionWrong);
}

function rainynextQuestion2A(event) {
  event.preventDefault();
  option1.style.animation = "";
  option2.style.animation = "";
  heartNum -= 1;
  userScore += 10;
  getlives(heartNum);
  option1.removeEventListener("click", rainynextQuestion2A);
  option2.removeEventListener("click", rainynextQuestionWrong);

  nodeStory.textContent =
    "Intrigued by the mysterious figure's invitation, you decide to follow. as soon as you enter the alley, the air feels heavy. Suddenly, the atmosphere shifts and the mysterious figure starts attacking you!";

  nodeStatus.textContent =
    "Caught off guard, you must make a quick decision. What will you do?";

  option1.textContent = "Fight back and confront the mysterious figure.";

  option2.textContent = "Attempt to evade and run away from the alley";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", rainynextQuestion3A);
  option2.addEventListener("click", rainynextQuestion3B);
}

function rainynextQuestion3A(event)  {
  event.preventDefault();
  userScore += 10;
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainynextQuestion3A);
  option2.removeEventListener("click", rainynextQuestion3B);

  nodeStory.textContent = 
  "The mysterious figure was testing your bravery all along! Impressed by your courage, the figure's hostile demeanor softens. They reach into the folds of their cloak and present you with a magnificent, magical sword as a reward.";

  nodeStatus.textContent = 
  "As you continue your journey, a sudden roar echoes through the alley."
  + "\nAs you navigate through the alley, you stands a majestic dragon. "
  + "\nSuddenly, you hear the distant sounds of chaos as the dragon begins its assault on the city. The ground shakes beneath you, and you sense the immense power emanating from the creature.";


  option1.textContent = "Attempt to communicate with the dragon.";

  option2.textContent = "Prepare for battle and draw your magical sword.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click",rainylose);
  option2.addEventListener("click",rainynextQuestion4A);

}

function rainynextQuestion3B(event) {
  event.preventDefault();
  userScore += 5;
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainynextQuestion3A);
  option2.removeEventListener("click", rainynextQuestion3B);

  nodeStory.textContent = 
  "That was close! Breathing a sigh of relief, you successfully evade the mysterious figure's immediate threat."

  nodeStatus.textContent = 
  "As you continue your journey, a sudden roar echoes through the alley.";
+ "\nAs you navigate through the alley, you stands a majestic dragon. ";
+"\nSuddenly, you hear the distant sounds of chaos as the dragon begins its assault on the city. The ground shakes beneath you, and you sense the immense power emanating from the creature.";


  option1.textContent = "Attempt to communicate with the dragon.";

  option2.textContent = "Prepare for battle.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click",rainylose);
  option2.addEventListener("click",rainylose);
}
function rainynextQuestion4A(event) {
  event.preventDefault();
  userScore += 15;
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainylose);
  option2.removeEventListener("click", rainynextQuestion4A);

  nodeStory.textContent = 
  "With unwavering determination, you have chosen to face the mighty dragon that looms before you. The air crackles with tension as you feel a surge of magical energy within, ready to be unleashed in the impending battle."

  nodeStatus.textContent = 
  "The dragon fixes its gaze upon you, and a low growl reverberates through the chamber. You sense a powerful presence emanating from the creature."

  option1.textContent = "Confront the dragon with your Aetherial Harmony magic."

  option2.textContent = "Unleash the fury of fire magic against the dragon."

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click",success);
  option2.addEventListener("click",rainylose);

}
function success(event)  {
  event.preventDefault();
  userScore += 20;
  var successUrl = ('./game_end.html?q=' + user + "&score=" + userScore);
  location.assign(successUrl);
}

function rainylose(event) {
  event.preventDefault();
  userScore += 5;
  var userinfo = JSON.parse(localStorage.getItem(user));
  var userCity = userinfo.city;
  option1.style.animation = "";
  option2.style.animation = "";
  heartNum = 0;
  getlives(heartNum);
  option1.removeEventListener("click", rainylose);
  option2.removeEventListener("click", rainylose);
  option2.removeEventListener("click",success);
  nodeStory.textContent = "As you take a step forward, the dragon inhales deeply, and with a powerful exhale, it unleashes a torrent of fire from its mouth. The searing flames engulf you and everything around you."
  nodeStatus.textContent = "Your journey comes to a tragic end," + user + " You failed to save "+ userCity;

  option1.textContent = "Restart";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", restart);
  option2.addEventListener("click", viewScore);


}

function rainynextQuestion2BFianl(event) {
  event.preventDefault();
  heartNum = 0;
  userScore += 3;
  intro.innerHTML = "";
  option1.style.animation = "";
  option2.style.animation = "";
  getlives(heartNum);
  option1.removeEventListener("click", rainynextQuestionWrong2A);
  option2.removeEventListener("click", rainynextQuestion2BFianl);

  nodeStory.textContent =
    "You quickly realize that you haven't had your usual dose of caffeine today.";

  nodeStatus.textContent =
    "As a coffee addict, you can't continue your journey without some coffee to fuel your adventures.";
  option1.textContent = "Restart";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", restart);
  option2.addEventListener("click", viewScore);
}

function restart() {
  var startingUrl = "./index.html";
  location.assign(startingUrl);
}

function viewScore() {
  var scoreUrl = "./scores.html?q=" + user + "&score=" + userScore;
  location.assign(scoreUrl);
}

/*
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
*/