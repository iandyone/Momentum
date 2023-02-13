import showTime from "./modules/time.js";
import { getWeather } from "./modules/weather.js";

window.addEventListener('load', getUserName);
window.addEventListener('beforeunload', setUserName);

showTime();
showWeather('Minsk');


function showWeather(location) {
    const city = document.querySelector('.city');
    const currentCity = getWeatherCity(location);

    city.value = currentCity;    
    city.onchange = () => {
        getWeather(city.value);
        localStorage.setItem('city', city.value);
    };

    getWeather(city.value);
}

function getUserName(userName) {
    const user = document.querySelector('.name');

    if (localStorage.getItem('name')) {
        user.value = localStorage.getItem('name');
    }
}

function setUserName() {
    const userName = document.querySelector('.name').value;
    localStorage.setItem('name', userName);
}

function getWeatherCity(location) {
    if (localStorage.getItem('city')) {
        return localStorage.getItem('city');
    }

    localStorage.setItem('city', location);
    return location;
}