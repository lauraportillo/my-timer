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
  const hours = parseInt(hoursElement.value).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutes = parseInt(minutesElement.value).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const seconds = parseInt(secondsElement.value).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  counterSeconds = seconds;
  counterMinutes = minutes;
  counterHours = hours;
  counterElement.innerHTML = `${hours} : ${minutes} : ${seconds}`;

  // 1000 milisegundo se trabaja en informática equivale a cada 1 segundo
  interval = setInterval(handleCounter, 1000, hours, minutes, seconds);
}

function handleCounter() {
  let counterSecondsTwoDigits = (counterSeconds -= 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let counterMinutesTwoDigits = counterMinutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  // SEGUIR CON LAS HORAS
  let counterHoursTwoDigits = counterHours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  counterElement.innerHTML = `${counterHoursTwoDigits} : ${counterMinutesTwoDigits} : ${counterSecondsTwoDigits}`;

  if (counterSeconds === 0) {
    counterMinutes = counterMinutes - 1;
    counterSeconds = 60;
  }
  if (counterMinutes === 0) {
    counterHours = counterHours - 1;
    counterMinutes = 59;
  }

  if (counterSeconds === 0 && counterMinutes === 0 && counterHours === 0) {
    clearInterval(interval); // sirve para parar el tiempo
    endElement.innerHTML = 'time is over';
    //esta condición no está funcionando
  }
}

function handlePauseBtn(evt) {
  //añadiendo prevent default hemos conseguido que cuando pulso el botón se para el tiempo donde esté
  evt.preventDefault();
  clearInterval(interval);
}

function handleStopBtn() {
  clearInterval(interval);
}

buttonStartElement.addEventListener('click', handleStartBtn);
buttonPauseElement.addEventListener('click', handlePauseBtn);
buttonStopElement.addEventListener('click', handleStopBtn);

// cuando llegue a 0 minutos  0 seg tiene que sonar la bocina
// investigar cómo parar el set interval
