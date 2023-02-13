import { getRandomValue } from '../index.js';
import { getTimeOfDay } from './greeting.js';

const timeOfDay = getTimeOfDay(new Date().getHours());
let pictureNum = getRandomValue(1, 20);

export function getBackgroundImage() {
    const img = new Image();

    if (pictureNum < 10) {
        pictureNum = `0${pictureNum}`;
    }

    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${pictureNum}.jpg`;
    img.onload = () => {
        document.body.style.backgroundImage = `url("${img.src}")`;
    };
}

export function getSlideNext() {
    pictureNum = (pictureNum == 20) ? 1 : +pictureNum + 1;
    getBackgroundImage();
}

export function getSlidePrev() {
    pictureNum = (pictureNum == 1) ? 20 : +pictureNum - 1;
    getBackgroundImage();
}