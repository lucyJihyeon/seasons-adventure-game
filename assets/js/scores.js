
// Assuming 'details' is your localStorage variable
//var details = JSON.parse(localStorage.getItem('details'));

var details = [
  { name: "Harika", city: "Frisco", weather: "60", score: "50" },
  { name: "Lucy", city: "San Jose", weather: "60", score: "90" },
  { name: "Jordan", city: "Sacramento", weather: "60", score: "90" },
];

// Reference to the table body
var tableBody = document.querySelector("tbody");

// Loop through details and populate the table
details.forEach(function (detail) {
  var row = tableBody.insertRow();
  var cellName = row.insertCell(0);
  var cellCity = row.insertCell(1);
  var cellWeather = row.insertCell(2);
  var cellScore = row.insertCell(3);

  cellName.innerHTML = detail.name;
  cellCity.innerHTML = detail.city;
  cellWeather.innerHTML = detail.weather;
  cellScore.innerHTML = detail.score;
});

// home button functionality
var homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", () => location.assign("index.html"));