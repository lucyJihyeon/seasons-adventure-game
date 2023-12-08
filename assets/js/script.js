var mapsApi = "AIzaSyBLylZUYb0UAI4-mRgItl36-bf6IlPMMxI";
var weatherApi = "bd198fc2c921dcda5323e5669a78656f";
var googlemapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + mapsApi + "&callback=initMap"
var initLat = "51.508742";
var initLng = "-0.120850";
var startingbtn = document.getElementById("start-btn");

function getParams(event)    {
    event.preventDefault();
    
    var city = document.getElementById("dark_select").value;
    console.log(city);
    var owUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherApi;
    searchCity(owUrl);
    console.log(owUrl);
}

function searchCity(owUrl)   {
    fetch(owUrl)
        .then(function (response)   {
            if(!response.ok)    {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data)   {
            if(data)    {
                console.log(data);
                var coorLat = data.coord.lat;
                var coorLon = data.coord.lon;
                
                initMap(coorLat, coorLon);
            }
        })
}








function initMap(coorLat, coorLon) {
    initLat = coorLat;
    initLng = coorLon;
    var mapOption = {
        center: new google.maps.LatLng(
            initLat, initLng
        ),
        zoom: 10
    };
    var map = new google.maps.Map( 
        document.getElementById('map'),mapOption);
    
}


startingbtn.addEventListener("click", getParams);





