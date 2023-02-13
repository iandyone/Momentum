const API_KEY = `901e2cb82742e82d213c46a83ddf4d8a`;
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const description = document.querySelector('.description-container');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');

export async function getWeather(location) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=ru&appid=${API_KEY}&units=metric`);
        displayWidget(res.status);

        if (res.status === 200) {
            const data = await res.json();
            setWidgetData(data);
        } else if (res.status === 404) {
            throw new Error(`Город не найден`)
        } else if (!location) {
            throw new Error(`Укажите название города`)
        } else {
            throw new Error(`Непредвиденная ошибка`)
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
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent = `Ветер: ${Math.round(data.wind.speed)} м/с`;
    weatherHumidity.textContent = `Влажность: ${Math.round(data.main.humidity)} %`;
}