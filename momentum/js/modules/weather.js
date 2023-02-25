import { appLanguage } from "../index.js";
const API_KEY = `901e2cb82742e82d213c46a83ddf4d8a`;
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const description = document.querySelector('.description-container');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');

export function showWeather(location) {
    const city = document.querySelector('.city');
    const currentCity = getWeatherCity(location);

    city.value = currentCity;
    city.onchange = () => {
        getWeather(city.value);
        localStorage.setItem('city', city.value);
    };

    getWeather(city.value);
}

async function getWeather(location) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${appLanguage}&appid=${API_KEY}&units=metric`);
        displayWidget(res.status);

        if (res.status === 200) {
            const data = await res.json();
            setWidgetData(data);
        } else if (res.status === 404) {
            const message = (appLanguage === 'en') ? "City not found" : "Город не найден";
            throw new Error(message);
        } else if (!location) {
            const message = (appLanguage === 'en') ? "Write the name of the city" : "Укажите название города";
            throw new Error(message);
        } else {
            const message = (appLanguage === 'en') ? "Unexpected error" : "Непредвиденная ошибка";
            throw new Error(message);
        }
    } catch (error) {
        weatherError.textContent = error.message;
    }
}

function displayWidget(status) {
    if (status === 200) {
        weatherIcon.classList.remove('hidden');
        temperature.classList.remove('hidden');
        description.classList.remove('hidden');
        weatherWind.classList.remove('hidden');
        weatherHumidity.classList.remove('hidden');
        weatherError.classList.add('hidden');
    } else {
        weatherIcon.classList.add('hidden');
        temperature.classList.add('hidden');
        description.classList.add('hidden');
        weatherWind.classList.add('hidden');
        weatherHumidity.classList.add('hidden');
        weatherError.classList.remove('hidden');
    }
}

function setWidgetData(data) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp} °C`;
    weatherDescription.textContent = data.weather[0].description;

    if (appLanguage === "ru") {
        weatherWind.textContent = `Ветер: ${Math.round(data.wind.speed)} м/с`;
        weatherHumidity.textContent = `Влажность: ${Math.round(data.main.humidity)} %`;
    } else if (appLanguage === "en") {
        weatherWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        weatherHumidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
    }
}

function getWeatherCity(location) {
    const currentCity = localStorage.getItem('city');

    if (currentCity) {
        if (currentCity === location || currentCity === 'Минск') {
            const city = (appLanguage === 'en') ? 'Minsk' : 'Минск';
            localStorage.setItem('city', city);
            return city;
        }
        return localStorage.getItem('city');
    }

    localStorage.setItem('city', location);
    return location;
}