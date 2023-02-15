import { appLanguage } from "../index.js";

const settingsData = {
    ru: {
        headers: {
            language: 'Язык',
        },
        options: {
            language: {
                header: 'Язык приложения',
            }
        }
    },
    en: {
        headers: {
            language: 'Language',
        },
        options: {
            language: {
                header: 'App Language',
            }
        }
    },
}


export default function configureApp() {
    setDefaultSettingsLanguage();
    translateSettings();
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

function translateSettings() {
    document.querySelector('.modal__setting.language').textContent = `${settingsData[appLanguage].headers.language}`;
    document.querySelector('.setting__header').textContent = `${settingsData[appLanguage].options.language.header}`;
}