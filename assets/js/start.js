var time = dayjs().format('hh : mm A');
var greeting = document.getElementById("name");
var weather = document.getElementById("weather");
var intro = document.getElementById("intro");

getname();
function getname()  {
    var searchParams = document.location.search.split("q=");
    var user = searchParams[1]
    getintro(user);
}

function getintro(user)    {
    var daynight = dayjs().format('A');
    var morning = dayjs().format('h');
    var time = parseInt(morning);
    var userinfo = JSON.parse(localStorage.getItem(user));
    var currentW = userinfo.weather;
    var userCity = userinfo.city;
    

    if (daynight == "AM") {
        greeting.textContent = "Good Morning, " + user;
    }else if ((daynight == "PM") && (time < 6)){
        greeting.textContent = "Good Afternoon, " + user;
    } else if ((daynight == "PM") && (time > 6)){
        greeting.textContent = "Good Night, " + user;
    }

    weather.textContent = "It is currently " + currentW + " In " + userCity;



}


   
