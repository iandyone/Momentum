import { getRandomValue } from '../index.js';
import { getTimeOfDay } from './greeting.js';

const timeOfDay = getTimeOfDay(new Date().getHours());
let pictureNum = getRandomValue(1, 20);

function getBackgroundImageGitHub() {
    const img = new Image();
    if (pictureNum < 10) {
        pictureNum = `0${pictureNum}`;
    }

    const souseLink = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${pictureNum}.jpg`;

    img.src = souseLink;
    img.onload = () => {
        document.body.style.backgroundImage = `url("${img.src}")`;
    };

    localStorage.setItem('backgroundSourse', 'github');
}

export function getSlideNext() {
    pictureNum = (pictureNum == 20) ? 1 : +pictureNum + 1;
    changeBackgroundImage();
}

export function getSlidePrev() {
    pictureNum = (pictureNum == 1) ? 20 : +pictureNum - 1;
    changeBackgroundImage();
}

function changeBackgroundImage() {
    const imageSource = localStorage.getItem('backgroundSourse') || `github`;

    if (imageSource == `github`) {
        getBackgroundImageGitHub();
        return;
    } else if (imageSource == 'unsplash') {
        getBackgroundImageUnsplash();
    } else {
        console.log('Непредвиденная ошибка во время загрузки фонового изображения');
    }
}

async function getBackgroundImageUnsplash() {
    try {
        const img = new Image();
        let searchTag = localStorage.getItem('imageTag') || `nature`;
        let unsplashFetchLink = `https://api.unsplash.com/photos/random?orientation=landscape&query=${searchTag}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
        const response = await fetch(unsplashFetchLink);

        if (response.status === 200) {
            const data = await response.json();
            img.src = data.urls.regular;
            img.onload = () => {
                document.body.style.backgroundImage = `url("${img.src}")`;
            };
        } else if (response.status === 403) {
            localStorage.setItem('backgroundSourse', `github`);
            const event = new Event("click");
            document.querySelector('[data-source="github"]').dispatchEvent(event);
            alert('Превышен лимин изображений для unsplash. Источник изображений изменен на github')
            changeBackgroundImage();
        } else {
            localStorage.setItem('imageTag', 'nature');
            await getBackgroundImageUnsplash();
        }
        localStorage.setItem('backgroundSourse', 'unsplash');
    } catch (error) {
        console.log(error.message);
    }
}