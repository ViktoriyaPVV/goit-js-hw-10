import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimeInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const secondsEl = document.querySelector('span[data-seconds]');
const minutesEl = document.querySelector('span[data-minutes]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');

let userSelectedDate = 0;

btnStart.disabled = true; // деактивація кнопки СТАРТ

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < Date.now()) {
      iziToast.error({
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        message: 'Please choose a date in the future',
      });
      return;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(dateTimeInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// функція яка форматує значення (додає 0, якщо в числі менше двох символів)
function addLeadingZero({ days, hours, minutes, seconds }) {
  secondsEl.textContent = String(seconds).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  daysEl.textContent = String(days).padStart(2, '0');
}

btnStart.addEventListener('click', onClick);

function onClick(event) {
  btnStart.disabled = true;
  dateTimeInput.disabled = true;
  const intervalId = setInterval(() => {
    const diff = userSelectedDate.getTime() - Date.now();
    if (diff === 0) {
      dateTimeInput.disabled = false;
      clearInterval(intervalId);
      return;
    }
    const timeComponents = convertMs(diff);
    addLeadingZero(timeComponents);
  }, 1000);
}
