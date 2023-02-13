import { getRandomValue } from "../index.js";
const API_URL = '../../quotes.json';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

export default async function getQuote() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const currentQuote = localStorage.getItem('quoteIndex');
        let newQuote = getRandomValue(0, Math.round(Array.from(data).length - 1));

        while (newQuote === currentQuote) {
            newQuote = getRandomValue(0, Math.round(Array.from(data).length - 1));
        }

        localStorage.setItem('quoteIndex', newQuote);
        quote.textContent = data[newQuote].text;
        author.textContent = data[newQuote].author;
    } catch (error) {
        console.log(error);
    }
}