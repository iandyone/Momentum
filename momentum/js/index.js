import { getSlideNext, getSlidePrev } from "./modules/slider.js";
import { getUserName, setUserName } from "./modules/greeting.js";
import { showWeather } from "./modules/weather.js";
import { playMusic, playNextTrack, playPrevTrack, renderPlayList } from "./modules/audio.js";
import getQuote from "./modules/quotes.js";
import showTime from "./modules/time.js";
import configureApp, { chooseImageTag, chooseOptions, setAppLanguage, setBackgroundImageSource, setElementVizability, setImagesSearchTag, showSettings } from "./modules/settings.js";
export const appLanguage = localStorage.getItem('appLanguage') || 'en';

window.addEventListener('load', getUserName);
window.addEventListener('beforeunload', setUserName);
document.querySelector('.play').addEventListener('click', playMusic);
document.querySelector('.name').addEventListener('change', setUserName);
document.querySelector('.change-quote').addEventListener('click', getQuote);
document.querySelector('.play-next').addEventListener('click', playNextTrack);
document.querySelector('.play-prev').addEventListener('click', playPrevTrack);
document.querySelector('.slide-next').addEventListener('click', getSlideNext);
document.querySelector('.slide-prev').addEventListener('click', getSlidePrev);
document.querySelector('.settings-button').addEventListener('click', showSettings);
document.querySelector('.images__input').addEventListener('change', setImagesSearchTag);

document.querySelectorAll('.setting__option.language').forEach(lang => {
    lang.addEventListener('click', setAppLanguage);
});
document.querySelectorAll('.setting__option.images').forEach(source => {
    source.addEventListener('click', setBackgroundImageSource);
});
document.querySelectorAll('.modal__setting').forEach(option => {
    option.addEventListener('click', chooseOptions);
});
document.querySelectorAll('.custom-checkbox-input').forEach(input => {
    input.addEventListener('click', setElementVizability);
});
document.querySelectorAll('.images__tag').forEach(tag => {
    tag.addEventListener('click', chooseImageTag);
});


configureApp();
showTime();
showWeather('Minsk');
getQuote();
renderPlayList();


export function getRandomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}