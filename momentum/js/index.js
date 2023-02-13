import showTime from "./1_time.js";

window.addEventListener('load', getUserName);
window.addEventListener('beforeunload', setUserName)

showTime();



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