import showGreeting from './greeting.js';
import { appLanguage } from '../index.js';

export default function showTime() {
    const time = document.querySelector('.time');
    const currentTime = new Date().toLocaleTimeString();
    
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const date = document.querySelector('.date');
    const currentDate = new Date();
    const daysOfWeek = {
        ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота',],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
    const months = {
        ru: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    }
    const currenDayOfWeek = daysOfWeek[appLanguage][currentDate.getDay()];
    const currentMonth = months[appLanguage][currentDate.getMonth()];
    const currentDay = currentDate.getDate();

    date.textContent = (appLanguage === 'en') ? `${currenDayOfWeek}, ${currentMonth} ${currentDay}` : `${currenDayOfWeek}, ${currentDay} ${currentMonth}`;
}