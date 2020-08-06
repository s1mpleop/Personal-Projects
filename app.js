
 
 
 //selecting the elements
 const notificationElement = document.querySelector(".notification");
 const iconElement = document.querySelector(".weather-icon");
 const tempElement = document.querySelector(".temperature-value p");
 const descElement = document.querySelector(".temperature-description p");
 const locationElement = document.querySelector(".location p");


 //creating app data
const weather ={};

weather.temperature = {
    unit:"celsius"
}

//creating some app constants

const kelvin = 273;

//Api key

const key = "54e520531ca479aa5fac241edb29daa9";

//checking if the browser supports gelocation

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition , showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";


}

//setting user's position

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude , longitude);
}

//showing error when there is an issuse in geolocation service

function showError (error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message}</>`;

}

//getting weather from the api

function getWeather(latitude , longitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //console.log(api);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp -kelvin);
            weather.descripition = data.weather[0].descripition;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
}

//displaying weather to ui

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C<span>`;
    descElement.innerHTML = weather.descripition;
    locationElement.innerHTML =`${weather.city}, ${weather.country}`
}

//C to F conversion

function celsiusToFahrenheit(temperature){
    return(temperature * 9/5)+32;
}

//When user clicks

tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined)return;

    if(weather.temperature.unit === "celsius"){
        let fahrenheit= celsiusToFahrenheit(weather.temperature.value) ;
        fahrenheit= Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F<span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C<span>`;
        weather.temperature.unit = "celsius";
    }
})
