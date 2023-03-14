import { appLanguage } from "../index.js";

export default function showGreeting() {
    const greeting = document.querySelector('.greeting');
    const hours = new Date().getHours();
    const timeOfDay = getTimeOfDay(appLanguage);
    const greetingMessage = getGreetingMessage(hours, timeOfDay, appLanguage);

    greeting.textContent = greetingMessage;
}

export function getTimeOfDay(appLanguage = 'en') {
    const hours = new Date().getHours();
    const timesOfDay = {
        ru: ['ночи', 'утро', 'день', 'вечер'],
        en: ['night', 'morning', 'afternoon', 'evening'],
    }
    return timesOfDay[appLanguage][Math.floor(hours / 6)];
}

export function getUserName() {
    const user = document.querySelector('.name');

    if (localStorage.getItem('name')) {
        user.value = localStorage.getItem('name');
    } else {
        const placeholder = (appLanguage === 'en') ? '[Enter the name]' : '[Введите имя]';
        document.querySelector('.name').placeholder = placeholder;
    }
}

export function setUserName() {
    const userName = document.querySelector('.name').value;
    localStorage.setItem('name', userName);
}

function getGreetingMessage(hours, timeOfDay, appLanguage) {
    if (appLanguage === "en") {
        return `Good ${timeOfDay},`;
    } else {
        const localizations = ['Доброй', 'Доброе', 'Добрый', 'Добрый',];
        return `${localizations[Math.floor(hours / 6)]} ${timeOfDay},`;
    }
}