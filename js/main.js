'use strict';

const hoursElement = document.querySelector('.js-hours');
const minutesElement = document.querySelector('.js-minutes');
const secondsElement = document.querySelector('.js-seconds');
const buttonStartElement = document.querySelector('.js-btnStart');
const buttonPauseElement = document.querySelector('.js-btnPause');
const buttonStopElement = document.querySelector('.js-btnStop');
const counterElement = document.querySelector('.js-counter');
const endElement = document.querySelector('.js-end');

let counterHours = 0;
let counterSeconds = 0;
let counterMinutes = 0;
let interval;

function handleStartBtn(evt) {
  evt.preventDefault();
  counterHours = parseInt(hoursElement.value);
  counterMinutes = parseInt(minutesElement.value);
  counterSeconds = parseInt(secondsElement.value);

  if (counterHours !== 0 || counterMinutes !== 0 || counterSeconds !== 0) {
    // 1000 milisegundo se trabaja en informática equivale a cada 1 segundo
    interval = setInterval(handleCounter, 1000);
  }
  endElement.innerHTML = '';
  paintTimer(counterHours, counterMinutes, counterSeconds);
}

function handleCounter() {
  counterSeconds -= 1;

  if (counterSeconds === -1) {
    counterSeconds = 59;
    counterMinutes -= 1;
    if (counterMinutes === -1) {
      counterMinutes = 59;
      counterHours -= 1;
    }
  }

  if (counterSeconds === 0 && counterMinutes === 0 && counterHours === 0) {
    clearInterval(interval); // sirve para parar el tiempo
    endElement.innerHTML = 'time is over';
  }
  paintTimer(counterHours, counterMinutes, counterSeconds);
}

function handlePauseBtn(evt) {
  evt.preventDefault();
  clearInterval(interval);
}

function handleStopBtn(evt) {
  evt.preventDefault();
  clearInterval(interval);
  paintTimer(0, 0, 0);
  endElement.innerHTML = '';
}

function paintTimer(hours, minutes, seconds) {
  let counterSecondsTwoDigits = seconds.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let counterMinutesTwoDigits = minutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let counterHoursTwoDigits = hours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  counterElement.innerHTML = `${counterHoursTwoDigits} : ${counterMinutesTwoDigits} : ${counterSecondsTwoDigits}`;
}

buttonStartElement.addEventListener('click', handleStartBtn);
buttonPauseElement.addEventListener('click', handlePauseBtn);
buttonStopElement.addEventListener('click', handleStopBtn);
