var time = dayjs().format('hh : mm A');
var greeting = document.getElementById("intro");


getname();
function getname()  {
    var searchParams = document.location.search.split("q=");
    var user = searchParams[1]
    intro(user);
}

function intro(user)    {
    var daynight = dayjs().format('A');
    var morning = dayjs().format('h');
    var time = parseInt(morning);
    
    if (daynight == "AM") {
        greeting.textContent = "Good Morning, " + user;
    }else if ((daynight == "PM") && (time < 6)){
        greeting.textContent = "Good Afternoon, " + user;
    } else if ((daynight == "PM") && (time > 6)){
        greeting.textContent = "Good Night, " + user;
    }
    getUserInfo(user);
}


function getUserInfo(user)  {
    var userinfo = JSON.parse(localStorage.getItem(user));
    console.log(userinfo);
}
