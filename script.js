// Pages
const inputContainer = document.querySelector('.countdown-container');
const countdownPage = document.getElementById('countdown');
const completePage = document.getElementById('complete');

// Input Container
const form = document.getElementById('countdownForm');
const titleEl = document.getElementById('title');
const dateEl = document.getElementById('date-picker');

// Countdown Container
const countdownElements = document.querySelectorAll('span');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');

// Complete Container
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let savedCountdown;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
// console.log(today);
dateEl.setAttribute('min', today);

function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
        inputContainer.hidden = true;

        if (distance < 0) {
            countdownPage.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completePage.hidden = false;
        } else {
            countdownElTitle.textContent = `${countdownTitle}`;
            countdownElements[0].textContent = `${days}`;
            countdownElements[1].textContent = `${hours}`;
            countdownElements[2].textContent = `${minutes}`;
            countdownElements[3].textContent = `${seconds}`;
            completePage.hidden = true;
            countdownPage.hidden = false;
        }
    }, second);
}

function updateForm(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        name: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if (countdownDate === '') {
        alert('Please select a date!');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.name;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function reset() {
    completePage.hidden = true;
    countdownPage.hidden = true;
    inputContainer.hidden = false;
    countdownTitle = '';
    countdownDate = '';
    clearInterval(countdownActive);
    localStorage.removeItem('countdown');
}

form.addEventListener('submit', updateForm);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load
restorePreviousCountdown();