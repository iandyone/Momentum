import { appLanguage } from "../index.js";

const settingsData = {
    ru: {
        headers: {
            language: 'Язык',
            widgets: 'Виджеты',
            background: 'Заставка',
        },
        options: {
            language: {
                header: 'Язык приложения',
            },
            widgets: {
                header: 'Отображение',
                time: 'Время',
                date: 'Дата',
                greeting: 'Приветствие',
                quotes: 'Цитаты',
                player: 'Плеер',
                weather: 'Погода',
            },
            background: {
                source: {
                    header: 'Источник',
                },
                search: {
                    header: 'Поиск',
                    placeholder: 'Поиск изображений по тегам',
                },
                note: {
                    github: 'Примечание: GitHub изображения имеют ограниченное количество и расположены в строгом порядке. Доступен переключение на следущее и предыдущее изображение',
                    unsplash: 'Примечание: можно менять до 50 изображений в час. Изображения расположены в случайном порядке',
                }
            },
        }
    },
    en: {
        headers: {
            language: 'Language',
            widgets: 'Widgets',
            background: 'Background',
        },
        options: {
            language: {
                header: 'App Language',
            },
            widgets: {
                header: 'Show',
                time: 'Time',
                date: 'Date',
                greeting: 'Greeting',
                quotes: 'Quotes',
                player: 'Player',
                weather: 'Weather',
            },
            background: {
                source: {
                    header: 'Source',
                },
                search: {
                    header: 'Search',
                    placeholder: 'Search images by tag',
                },
                note: {
                    github: 'Note: GitHub images are limited and sorted in a strict order. Switching to the next and previous image are available',
                    unsplash: 'Note: You can change up to 50 images per hour. The images will be switched in random order',
                }
            },
        }
    },
}

function translateSettings() {
    // Language
    document.querySelector('.modal__setting.language').textContent = settingsData[appLanguage].headers.language;
    document.querySelector('.setting__header').textContent = settingsData[appLanguage].options.language.header;

    // Show
    document.querySelector('.modal__setting.show').textContent = settingsData[appLanguage].headers.widgets;
    for (let key in settingsData[appLanguage].options.widgets) {
        document.querySelector(`#setting-widgets-${key}`).textContent = settingsData[appLanguage].options.widgets[key];
    }

    // Background
    const currentImageSource = localStorage.getItem('backgroundSourse');
    document.querySelector('.modal__setting.images').textContent = settingsData[appLanguage].headers.background;
    document.querySelector('.setting__header.images').textContent = settingsData[appLanguage].options.background.source.header;
    document.querySelector('.setting__notes').textContent = settingsData[appLanguage].options.background.note[currentImageSource];
    document.querySelector('.setting__header.images__search').textContent = settingsData[appLanguage].options.background.search.header;
    document.querySelector('.images__input').placeholder = settingsData[appLanguage].options.background.search.placeholder;
    
}

export default function configureApp() {
    getElementsVisability();
    setDefaultBackgroundSource();
    setDefaultSettingsLanguage();
    translateSettings();
    setImagesSearchBarVisability();
}

export function showSettings(e) {
    e.target.classList.toggle('active');
    document.querySelector('.modal').classList.toggle('active');
}

export function setAppLanguage(event) {
    const languages = document.querySelectorAll('.setting__option.language');
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
    const newSetting = (setting == 'false') ? true : false;

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

        if (elementVisabilitySetting == 'false') {
            input.removeAttribute('checked');
            document.querySelector(`[data-type=${input.value}]`).classList.toggle('hidden');
            const targetElement = document.querySelector(`[data-type=${input.value}]`);
            targetElement.classList.add('hidden');
        }
    })
}

export function setBackgroundImageSource(event) {
    const sources = document.querySelectorAll('.setting__option.images');
    const searchBar = document.querySelector(`.images__search-bar`);

    sources.forEach(source => {
        if (source === event.target) {
            const searchBarVisability = (event.target.dataset.source == 'unsplash')? `block` : 'none';
            source.classList.add('active');
            document.querySelector('.setting__notes').textContent = settingsData[appLanguage].options.background.note[source.dataset.source];
            searchBar.style.display = searchBarVisability;
            localStorage.setItem('backgroundSourse', event.target.dataset.source);
            return;
        }
        source.classList.remove('active');
    });
}

function setDefaultBackgroundSource() {
    const sources = document.querySelectorAll('[data-source]');
    const defaultSource = localStorage.getItem('backgroundSourse') || 'github';
    localStorage.setItem('backgroundSourse', defaultSource);
    sources.forEach(source => {
        if (source.dataset.source === defaultSource) {
            source.classList.add('active');
            document.querySelector('.setting__notes').textContent = settingsData[appLanguage].options.background.note[source.dataset.source];
        }
    })
}

export function chooseImageTag(e) {
    localStorage.setItem('imageTag', e.target.dataset.value);
    document.querySelector('.images__input').value = e.target.dataset.value;
}

export function setImagesSearchTag(e) {
    localStorage.setItem('imageTag', e.target.value);
}

function setImagesSearchBarVisability() {
    const searchBar = document.querySelector(`.images__search-bar`);
    const unsplashElement = document.querySelector('[data-source="unsplash"]');
    const searchBarVisability = (unsplashElement.classList.contains('active'))? `block` : 'none';
    
    searchBar.style.display = searchBarVisability;
}