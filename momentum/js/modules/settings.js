import { appLanguage } from "../index.js";

const settingsData = {
    ru: {
        headers: {
            language: 'Язык',
            show: 'Отображение',
        },
        options: {
            language: {
                header: 'Язык приложения',
            },
            show: {
                header: 'Виджеты',
                time: 'Время',
                date: 'Дата',
                greeting: 'Приветствие',
                quotes: 'Цитаты',
                player: 'Плеер',
                weather: 'Погода',
            }
        }
    },
    en: {
        headers: {
            language: 'Language',
            show: 'Show',
        },
        options: {
            language: {
                header: 'App Language',
            },
            show: {
                header: 'Widgets',
                time: 'Time',
                date: 'Date',
                greeting: 'Greeting',
                quotes: 'Quotes',
                player: 'Player',
                weather: 'Weather',
            }
        }
    },
}
function translateSettings() {
    // Language
    document.querySelector('.modal__setting.language').textContent = settingsData[appLanguage].headers.language;
    document.querySelector('.setting__header').textContent = settingsData[appLanguage].options.language.header;

    // Show
    document.querySelector('.modal__setting.show').textContent = settingsData[appLanguage].headers.show;
    for (let key in settingsData[appLanguage].options.show) {
        document.querySelector(`#setting-show-${key}`).textContent=settingsData[appLanguage].options.show[key];
    }
}

export default function configureApp() {
    setDefaultSettingsLanguage();
    translateSettings();
    getElementsVisability();
}

export function setAppLanguage(event) {
    const languages = document.querySelectorAll('.setting__option');
    languages.forEach(lang => {
        if (lang === event.target) {
            lang.classList.add('active');
            localStorage.setItem('appLanguage', event.target.dataset.lang);
            return;
        }
        lang.classList.remove('active');
    });
    location.reload();
}

function setDefaultSettingsLanguage() {
    const languageOptions = document.querySelectorAll('[data-lang]');
    languageOptions.forEach(item => {
        if (item.dataset.lang === appLanguage) {
            item.classList.add('active');
        }
    })

    localStorage.setItem('appLanguage', appLanguage);
}


export function chooseOptions(event) {
    const optionsHeaders = document.querySelectorAll('.modal__setting');

    optionsHeaders.forEach(header => {
        if (header == event.target) {
            const options = document.querySelectorAll('.setting__item');

            header.classList.add('active');
            options.forEach(option => {
                (option.dataset.option === header.dataset.setting) ? option.classList.add('active') : option.classList.remove('active');
            })
            return;
        }
        header.classList.remove('active');
    })
}

export function setElementVizability(event) {
    const setting = localStorage.getItem(`${event.target.value}Visability`);
    const newSetting = (setting == 'false')? true : false;

    event.target.classList.toggle('active');
    localStorage.setItem(`${event.target.value}Visability`, newSetting);
    document.querySelector(`[data-type=${event.target.value}]`).classList.toggle('hidden');
}

function getElementsVisability() {
    const inputs = document.querySelectorAll('.custom-checkbox-input');
    
    inputs.forEach(input => {
        const elementVisability = localStorage.getItem(`${input.value}Visability`);
        const elementVisabilitySetting = (elementVisability == null) ? true : elementVisability;
        localStorage.setItem(`${input.value}Visability`, elementVisabilitySetting);

        if(elementVisabilitySetting == 'false') {
            input.removeAttribute('checked');
            document.querySelector(`[data-type=${input.value}]`).classList.toggle('hidden');
            const targetElement = document.querySelector(`[data-type=${input.value}]`);
            targetElement.classList.add('hidden');
        }
    })
}