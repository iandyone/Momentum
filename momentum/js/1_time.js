import showGreeting from './2_greeting.js'; 

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
    const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    const currentDate = new Date().toLocaleDateString('ru-Ru', options);;

    date.textContent = currentDate;
}