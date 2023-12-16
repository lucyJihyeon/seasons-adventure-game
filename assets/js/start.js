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
//starting score set up
var userScore = 20;

getintro(user);

//Function to display the user's lives(hearts)
function getlives(heartNum) {
  //clear out the existing heart icons
  iconContainer.innerHTML = "";
  for (var i = 0; i < heartNum; i++) {
    var heart = document.createElement("i");
    heart.classList.add("nes-icon", "is-medium", "heart");
    iconContainer.appendChild(heart);
  }
}
//Function to initialize the game and display the user's information
function getintro(user) {
  //Get the current time of day and time
  var daynight = dayjs().format("A");
  var morning = dayjs().format("h");
  var time = parseInt(morning);
  //Get the user information from the localStorage
  var userinfo = JSON.parse(localStorage.getItem(user));
  var currentW = userinfo.weather;
  var userCity = userinfo.city;

  //Display a personalized greeting based on the time
  if (daynight == "AM") {
    greeting.textContent = "Good Morning, " + user;
  } else if (
    (daynight == "PM" && time < 6) ||
    (daynight == "PM" && time === 12)
  ) {
    greeting.textContent = "Good Afternoon, " + user;
  } else if (
    (daynight == "PM" && time > 6) ||
    (daynight == "AM" && time === 12)
  ) {
    greeting.textContent = "Good Night, " + user;
  }

  //Get the current weather condition to display in the greeting section and the game scenarios to initiate the corresponding function
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
  //Display the weather information to the user
  weather.textContent = "It is currently " + currentW + " In " + userCity;
}
//Function to start the overcast scenario
function startOvercast(userCity) {
  //Set up the game scenario for the overcast weather
  nodeStory.textContent =
    "The sky hangs heavy with thick, gray clouds, casting a dim light over your surroundings. You find yourself in the midst of an overcast day, the air pregnant with the promise of rain. ";
  nodeStatus.textContent =
    "Caught between the uncertainty of impending rain and a subtle tension in the cloudy atmosphere, you must make a decision. What will you do? ";
  option1.textContent =
    "Stay in the current area and embrace the overcast ambiance.";
  option2.textContent = "Go to a location known for sudden rain showers.";
  //Add typying animation to the option buttons
  option1.style.animation =
    "typing 2s steps(" + option1.textContent.length + ")";
  option2.style.animation =
    "typing 2s steps(" + option2.textContent.length + ")";

  //Display the current lives
  getlives(heartNum);

  //When option1 is clicked, call ocLose function
  option1.addEventListener("click", ocLose);
  //When option2 is clicked, call startRain function
  option2.addEventListener("click", function () {
    startRain(userCity);

    // Remove event listeners right after call the startRain function to prevent duplicating event listener
    option1.removeEventListener("click", ocLose);
    option2.removeEventListener("click", arguments.callee);
  });
}
//Function to handle the user's loss in the overcast scenario
function ocLose(event) {
  event.preventDefault();
  //empty the intro greeting
  intro.innerHTML = "";
  //empty the lives
  heartNum = 0;
  //lose 20 points
  userScore -= 20;
  //display the lives
  getlives(heartNum);
  //remove the previous animation
  option1.style.animation = "";
  option2.style.animation = "";
  //remove the previous event
  option1.removeEventListener("click", ocLose);

  nodeStory.textContent =
    "As you linger in the overcast atmosphere, a sudden and unforeseen weather disaster strikes. The calmness of the clouds quickly transforms into chaos. Violent winds whip through the area, and torrential rain begins to pour.";

  nodeStatus.textContent =
    "The sudden weather disaster proves too much to handle. Overwhelmed by the forces of nature, your journey comes to an abrupt and unfortunate end. Game Over.";
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScore);
}
//Function to start the Rainy scenario
function startRain(userCity) {
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  //updating the game node
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

  option1.addEventListener("click", rainynextQuestion1A);
  option2.addEventListener("click", rainynextQuestionWrong);
}
//Update the node
function rainynextQuestionWrong(event) {
  event.preventDefault();
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);
  userScore += 10;
  option1.removeEventListener("click", rainynextQuestion1A);
  option1.removeEventListener("click", rainynextQuestion2A);
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
//Update the node
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
    '"I am so sorry ' +
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
//Update the node
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

  option1.textContent = "";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option2.addEventListener("click", viewScore);
}
//Update the node
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
//Update the node
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
//Update the node
function rainynextQuestion3A(event) {
  event.preventDefault();
  userScore += 10;
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainynextQuestion3A);
  option2.removeEventListener("click", rainynextQuestion3B);

  nodeStory.textContent =
    "The mysterious figure was testing your bravery all along! Impressed by your courage, the figure's hostile demeanor softens. They reach into the folds of their cloak and present you with a magnificent, magical sword as a reward.";

  nodeStatus.textContent =
    "As you continue your journey, a sudden roar echoes through the alley." +
    "\nAs you navigate through the alley, you stands a majestic dragon. " +
    "\nSuddenly, you hear the distant sounds of chaos as the dragon begins its assault on the city. The ground shakes beneath you, and you sense the immense power emanating from the creature.";

  option1.textContent = "Attempt to communicate with the dragon.";

  option2.textContent = "Prepare for battle and draw your magical sword.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", rainylose);
  option2.addEventListener("click", rainynextQuestion4A);
}
//Update the node
function rainynextQuestion3B(event) {
  event.preventDefault();
  userScore += 5;
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainynextQuestion3A);
  option2.removeEventListener("click", rainynextQuestion3B);

  nodeStory.textContent =
    "That was close! Breathing a sigh of relief, you successfully evade the mysterious figure's immediate threat.";

  nodeStatus.textContent =
    "As you continue your journey, a sudden roar echoes through the alley.";
  +"\nAs you navigate through the alley, you stands a majestic dragon. ";
  +"\nSuddenly, you hear the distant sounds of chaos as the dragon begins its assault on the city. The ground shakes beneath you, and you sense the immense power emanating from the creature.";

  option1.textContent = "Attempt to communicate with the dragon.";

  option2.textContent = "Prepare for battle.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", rainylose);
  option2.addEventListener("click", rainylose);
}
//Update the node
function rainynextQuestion4A(event) {
  event.preventDefault();
  userScore += 15;
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", rainylose);
  option2.removeEventListener("click", rainynextQuestion4A);

  nodeStory.textContent =
    "With unwavering determination, you have chosen to face the mighty dragon that looms before you. The air crackles with tension as you feel a surge of magical energy within, ready to be unleashed in the impending battle.";

  nodeStatus.textContent =
    "The dragon fixes its gaze upon you, and a low growl reverberates through the chamber. You sense a powerful presence emanating from the creature.";

  option1.textContent =
    "Confront the dragon with your Aetherial Harmony magic.";

  option2.textContent = "Unleash the fury of fire magic against the dragon.";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", success);
  option2.addEventListener("click", rainylose);
}
//Function to handle the user's success
function success(event) {
  event.preventDefault();
  userScore = 100;
  //redirect the user to game_end html with their information as parameters
  var successUrl = "./game_end.html?q=" + user + "&score=" + userScore;
  location.assign(successUrl);
}
//Functino to handle the user's loss in the rainy scenario
function rainylose(event) {
  event.preventDefault();
  userScore += 5;
  var userinfo = JSON.parse(localStorage.getItem(user));
  var userCity = userinfo.city;
  option1.style.animation = "";
  option2.style.animation = "";
  heartNum = 0;
  getlives(heartNum);
  //there are two cases option2 calls rainylose and success from the previous branch
  option1.removeEventListener("click", rainylose);
  option2.removeEventListener("click", rainylose);
  option2.removeEventListener("click", success);
  nodeStory.textContent =
    "As you take a step forward, the dragon inhales deeply, and with a powerful exhale, it unleashes a torrent of fire from its mouth. The searing flames engulf you and everything around you.";
  nodeStatus.textContent =
    "Your journey comes to a tragic end, " +
    user +
    " You failed to save " +
    userCity;

  option1.textContent = "";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option2.addEventListener("click", viewScore);
}
//Update the game node
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
  option1.textContent = "";
  option2.textContent = "View the Scores";

  setTimeout(function () {
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option2.addEventListener("click", viewScore);
}
// Function to redirect the user to the scores.html with their information as parameters
function viewScore() {
  var scoreUrl = "./scores.html?q=" + user + "&score=" + userScore;
  location.assign(scoreUrl);
}

//Function to start sunny condition scenario
function startSunny(userCity) {
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  //updating the game node
  nodeStory.textContent =
    "The sun bathes the city in warm light. \n The sky is clear and you are in the midst of a bustling urban environment in " +
    userCity;

  nodeStatus.textContent =
    " While you're enjoying the sunlight, A mysterious message appears on your phone, \"" +
    userCity +
    " conceals secrets that only the adventurer can uncover\n. Choose your path widely, and let city's whispers guide you, " +
    user;

  option1.textContent = "Decline the journey";

  option2.textContent = "Accept the journey";

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  // When option1 is clicked, call sunnyLose function
  option1.addEventListener("click", function () {
    sunnyLose(userCity);
  });
  option2.addEventListener("click", acceptJourney);
}

function sunnyLose(userCity) {
  //empt the intro
  intro.innerHTML = "";
  //empty the lives
  heartNum = 0;
  //lose 20 points
  userScore -= 20;
  //display the lives
  getlives(heartNum);
  option1.removeEventListener("click", function () {
    sunnyLose(userCity);
  });
  option2.removeEventListener("click", acceptJourney);
  //remove the previous animation
  option1.style.animation = "";
  option2.style.animation = "";
  nodeStory.textContent = 
  " You decide to decline the journey. As you turn away from the mysterious message, you feel a sense of relief, but also a hint of regret. What adventures might you have missed?"

  nodeStatus.textContent = "Game Over";
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScoreHandler);
}
function viewScoreHandler() {
  viewScore();
}

function acceptJourney() {
  intro.innerHTML = "";
  heartNum -= 1;
  getlives(heartNum);
  userScore += 10;
  option1.removeEventListener("click", function () {
    sunnyLose(userCity);
  });
  option2.removeEventListener("click", acceptJourney);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    'a mysterious message appears on your scrren.\n It reads, " A hidden Oasis awaits the daring adventurer. Seek it out and take your treasure. ';
  nodeStatus.textContent = "Your curiosity is piqued. What will you do?";
  option1.textContent = " Ask the locals about the hidden oasis.";
  option2.textContent = "Visit the library to find information.";
  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click", askLocals);
  option2.addEventListener("click", gotoLibrary);
}

function askLocals() {
  heartNum = 2;
  getlives(heartNum);
  userScore += 10;
  option2.style = "";
  var userinfo = JSON.parse(localStorage.getItem(user));
  var userCity = userinfo.city;
  option1.removeEventListener("click", askLocals);
  option2.removeEventListener("click", gotoLibrary);
  option2.removeEventListener("click", viewScoreHandler);

  nodeStory.textContent =
    "You decide to ask the locals about the hidden oasis.\n They share tales of a mystical place rumored to bring good fortune and enlightenment.";
  nodeStatus.textContent =
    "As you express your interest, a friendly local smiles and hands you a map, that appears to be torn and somewhat hard to see saying, 'This map will guide you to the hidden oasis.' ";
  option1.textContent = "Accept the Map ";
  option2.textContent = "Decline and explore other areas in " + userCity + ".";

  setTimeout(function () {
    option1.style = " ";
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", trickMap);
  option2.addEventListener("click", lostForest);
}

function trickMap() {
  heartNum = 0;
  getlives(heartNum);
  userScore += 5;
  option1.removeEventListener("click", trickMap);
  option2.removeEventListener("click", lostForest);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "Excited about the hidden oasis, you decide to follow the map provided by the locals. \n However, as you venture deeper, you realize something is amiss.";
  nodeStatus.textContent =
    "The surroundings become increasingly dense, and the once-friendly path transforms into a treacherous forest filled with dangerous creatures.\n Then you quickly realize that the map was a trick";
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", function(){
    viewScore();
    option2.removeEventListener("click", viewScore)});
  
}

function lostForest() {
  heartNum = 0;
  getlives(heartNum);
  userScore += 5;
  option1.removeEventListener("click", trickMap);
  option2.removeEventListener("click", lostForest);
  option2.removeEventListener("click", viewScoreHandler);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
    "You decide to decline the map and explore the mysterious oasis on your own.\n However, as you venture deeper into the unfamiliar forest, the surroundings become increasingly dense, and you quickly find yourself lost.";
  nodeStatus.textContent =
    "The once-friendly path transforms into a treacherous forest.\n You can't find a way out and now you are stuck in the forest forever.";
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScore);
}

function gotoLibrary() {
  getlives(heartNum);
  userScore += 10;
  var userinfo = JSON.parse(localStorage.getItem(user));
  var userCity = userinfo.city;
  option1.removeEventListener("click", askLocals);
  option1.removeEventListener("click", viewScore);
  option2.removeEventListener("click", gotoLibrary);
  option1.style = "";
  option2.style = "";

  nodeStory.textContent =
  "You decide to visit the local library in " + userCity + " in search of valuable information.";
  nodeStatus.textContent ="As you enter the library, you see two promising sections: the History Aisle and the Geology Aisle. Each aisle holds its own mysteries.";
  option1.textContent = "Find documentation in the History Aisle.";
  option2.textContent = "Find documentation in the Geology Aisle.";

  setTimeout(function () {
    option1.style = "";
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click",libraryMap);
  option2.addEventListener("click",libraryMap);
}

function libraryMap() {
  userScore += 10;
  option2.style = "";
  option1.style = "";
  heartNum = 1;
  getlives(heartNum);
  
  option1.removeEventListener("click", libraryMap);
  option1.removeEventListener("click", libraryMap);
  

  nodeStory.textContent =
  "In the aisle, you find a wrinkled map tucked between dusty old books. It seems to depict the location of the hidden oasis, marked with an 'X."
  nodeStatus.textContent =
  "Now you face a choice: Keep the map and use it to venture towards the oasis, or leave it behind and search for another source of information."
  option1.textContent = 
  "Keep the wrinkled map, and continue your journey with it"
  option2.textContent = 
  "Leave the map and find another source."

  setTimeout(function () {
    option1.style = " ";
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option1.addEventListener("click",rightLeft);
  option2.addEventListener("click",stuck);
}

function stuck()  {
  heartNum = 0
  getlives(heartNum);
  userScore -=5;
  option2.style = "";
  
  option1.removeEventListener("click", rightLeft);
  option1.removeEventListener("click", stuck);
  option2.style = "";
  option1.style = "";

  nodeStory.textContent =
  "Opting to leave the wrinkled map behind, you scour the library for other resources. Hours pass as you become engrossed in your search, unaware that the library is closing."
  nodeStatus.textContent =
  "As you look up from the dusty tomes, you realize that the library is now empty, and the lights are dimmed.\n you are now locked inside the library. "
  option1.textContent = ""
  option2.textContent = "View the Scores"

  setTimeout(function () {
    option1.style = "display: none";
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option2.addEventListener("click",viewScoreHandler);
}

function rightLeft()  {
  userScore += 10;
  option2.style = "";
  heartNum = 1;
  getlives(heartNum);
  
  option1.removeEventListener("click", rightLeft);
  option1.removeEventListener("click", stuck);
  option2.style = "";
  option1.style = "";

  nodeStory.textContent =
  "You decide to venture into the unknown. As you unfold the map, it reveals two paths: one leading to the right and the other to the left."
  nodeStatus.textContent =
  "You must choose your direction wisely. Which path will you take?"
  option1.textContent = 
  "Right"
  option2.textContent = 
  "Left"

  setTimeout(function () {
    option1.style = " ";
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", success);
  option2.addEventListener("click", goLeft);
}

function goLeft() {
  heartNum = 0
  getlives(heartNum);
  option2.style = "";
  
  option1.removeEventListener("click", success);
  option1.removeEventListener("click", goLeft);
  option2.style = "";
  option1.style = "";

  nodeStory.textContent =
  "You decide to go left, following the path indicated on the wrinkly map. The journey takes you deeper into the unknown, and the surroundings become increasingly unfamiliar."
  nodeStatus.textContent =
  "As you venture further, you realize the map might not be as reliable as you thought. The once-promising path becomes a maze of tangled vegetation, and you find yourself completely lost."
  option1.textContent = ""
  option2.textContent = "View the Scores"

  setTimeout(function () {
    option1.style = "display: none";
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);

  option2.addEventListener("click",viewScoreHandler);
}

function startSnowy(userCity) {
  heartNum = 3;
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  //updating the game node
  nodeStory.textContent =
    "You stand at the summit of a snowy covered mountain, surrounded by pristine white landscapes and overlooking " + userCity
      + ".";
  nodeStatus.textContent =
  "Two mysterious figures offer guidance. An old sage with ancient wisdom or a talking Arctic fox with magical insights.";
   
  option1.textContent = 
  "Follow the Old Sage"
  option2.textContent = 
  "Follow the Arctic Fox"

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", followSage);
  option2.addEventListener("click", followFox);
}
function followSage() {
  heartNum -= 1;
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  intro.innerHTML = "";
  option1.removeEventListener("click",followSage);
  option2.removeEventListener("click", followFox);
  userScore += 10;
  //updating the game node
  nodeStory.textContent =
  "The Old Sage reveals that the mountain whispers tales of ice and ancient magic.";
  
  nodeStatus.textContent =
   "Together, you and the Old Sage venture into the snowy valley and encounter a mysterious cave entrance that emanates strange magical energy."
  option1.textContent = 
  "Enter the mysterious cave and learn more about this strange magical energy"
  option2.textContent = 
  "Continue through the valley spooked by the strange aura the cave gives off"
  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", enterValley);
  option2.addEventListener("click", continueValley);
}
function continueValley() {
  heartNum -= 1;
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  intro.innerHTML = "";
  option1.removeEventListener("click", enterValley);
  option2.removeEventListener("click", continueValley);
  userScore += 5;
  //updating the game node
  nodeStory.textContent =
  "You're caught in a snowstorm without any shelter! If you don't get warm in time you'll die in the snowy tundra.";
  nodeStatus.textContent =
  "You spot a dead TaunTaun and remember what Luke Skywalker did"
  option1.textContent = 
  "uses a lightsaber to slice open the belly of a deceased Tauntaun"
  option2.textContent = 
  "I've never seen Star Wars"

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", starWars);
  option2.addEventListener("click", noStarWars);
}
function starWars() {
  heartNum = 0;
  getlives(heartNum);
  userScore += 5;
  option1.removeEventListener("click", starWars);
  option2.removeEventListener("click", noStarWars);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
  "Congratulations! You're a nerd! But you've managed to survive the snowstorm thanks to the help of George Lucas!"
  nodeStatus.textContent =
  "The Old Sage, however, seems shocked by your unconventional survival tactic. He informs you that he cannot continue the journey with you"
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScoreHandler);
}
function noStarWars() {
  heartNum = 0;
  getlives(heartNum);
  userScore += 5;
  option1.removeEventListener("click", starWars);
  option2.removeEventListener("click", noStarWars);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
  "Your lack of pop culture references gets you killed in the snowy tundra."
  nodeStatus.textContent =
  "You should've made a wiser choice."
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScoreHandler);
}
function followFox()  {
  heartNum -= 1;
  getlives(heartNum);
  option1.style.animation = "";
  option2.style.animation = "";
  intro.innerHTML = "";
  option1.removeEventListener("click",followSage);
  option2.removeEventListener("click", followFox);
  userScore += 10;
  //updating the game node
  nodeStory.textContent =
  "The Arctic Fox guides you deeper into the cave. The air is filled with a faint glow, and the echoing sounds of unseen creatures reverberate through the icy chambers"
  nodeStatus.textContent =
  "He informs you that he's a mountain spirit who guides travelers to safety down the mountain and gives you a meal to eat.";
  option1.textContent = 
  "Ask the Arctic Fox about this strange magical aura in the air."
  option2.textContent = 
  "Steal the food in the cave and leave"

  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", askFox);
  option2.addEventListener("click", stealFood);
}
function askFox() {
  heartNum = 0;
  getlives(heartNum);
  userScore += 5;
  option1.removeEventListener("click", askFox);
  option2.removeEventListener("click", stealFood);
  option2.removeEventListener("click", stealFood2);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
  "The Arctic Fox has deceived you! The Frost Giant emerges from the cave and traps you in his lair all thanks to his shape-shifting minions. You've been captured with no hope of escape "
  nodeStatus.textContent =
  "Now, you learn your lesson, Never believe a cunning Arctic Fox."
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScoreHandler);
}
function stealFood()  {
  userScore += 5;
  heartNum = 0;
  getlives(heartNum);
  option1.removeEventListener("click", askFox);
  option2.removeEventListener("click", stealFood);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
  "As you attempt to steal the food, the Arctic Fox, sensing your greed, transforms into a fearsome creature. The cave shudders, and you find yourself entangled in the Fox's magical powers.";

  nodeStatus.textContent =
  "The last thing you hear is a warning about the consequences of dishonesty as the Arctic Fox's magic seals your fate.";
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScoreHandler);
}
function enterValley()  {
  getlives(heartNum)
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", enterValley);
  option2.removeEventListener("click", continueValley);
  userScore += 10;
  //updating the game node
  nodeStory.textContent =
  "The Old Sage transforms into an Arctic Fox and guides you deeper into the cave. The air is filled with a faint glow, and the echoing sounds of unseen creatures reverberate through the icy chambers";
  nodeStatus.textContent =
  "He informs you that he's a mountain spirit who guides travelers to safety down the mountain and gives you a meal to eat.";
  option1.textContent = 
  "Ask the him about this strange magical aura in the air."
  option2.textContent = 
  "Steal the food in the cave and leave. because you just saw an old man turn into a fox";
  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", askFox);
  option2.addEventListener("click", stealFood2);
}
function stealFood2() {
  getlives(heartNum)
  option1.style.animation = "";
  option2.style.animation = "";
  option1.removeEventListener("click", askFox);
  option2.removeEventListener("click", stealFood2);
  userScore += 20;
  //updating the game node
  nodeStory.textContent =
  "Thankfully you had enough food to make it down the mountain. You find an inn for the night and rest from an odd day in the snow."
  nodeStatus.textContent =
  "As you approach the inn, you notice a warm glow and the inviting scent of a hearty meal."
  option1.textContent = 
  "Do not enter and continue your journey"
  option2.textContent = 
  "Enter the inn and warm up."
  setTimeout(function () {
    option1.style.animation =
      "typing 2s steps(" + option1.textContent.length + ")";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  option1.addEventListener("click", ignoreInn);
  option2.addEventListener("click", success);
}
function ignoreInn()  {
  userScore += 5;
  option1.removeEventListener("click", ignoreInn);
  option2.removeEventListener("click", viewScoreHandler);
  option1.style.animation = "";
  option2.style.animation = "";

  nodeStory.textContent =
  "You decide to brave the cold and continue your journey without seeking shelter. As the night progresses, the temperature drops sharply, and you find yourself shivering in the biting cold.";
  nodeStatus.textContent =
  "Without the warmth of the inn, the harsh weather takes its toll. Your energy wanes, and you struggle to endure the freezing conditions.";
  option1.textContent = "";
  option2.textContent = "View the Scores";

  //add style to the options
  setTimeout(function () {
    //clear out the option1
    option1.style = "display: none";
    option2.style.animation =
      "typing 2s steps(" + option2.textContent.length + ")";
  }, 10);
  //when option2 is clicked, call viewScore
  option2.addEventListener("click", viewScoreHandler);
}

