import { getBackgroundImage, getSlideNext, getSlidePrev } from "./modules/slider.js";
import { getWeather } from "./modules/weather.js";
import getQuote from "./modules/quotes.js";
import showTime from "./modules/time.js";

window.addEventListener('load', getUserName);
window.addEventListener('beforeunload', setUserName);
document.querySelector('.change-quote').addEventListener('click', getQuote);
document.querySelector('.slide-next').addEventListener('click', getSlideNext);
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);

showTime();
showWeather('Minsk');
getQuote();
getBackgroundImage()


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

export function getRandomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}