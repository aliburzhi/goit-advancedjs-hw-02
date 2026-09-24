import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const inputEL = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]")

const spanDays = document.querySelector("[data-days]")
const spanHours = document.querySelector("[data-hours]")
const spanMins = document.querySelector("[data-minutes]")
const spanSeconds = document.querySelector("[data-seconds]")

let userSelectedDate;
startBtn.disabled = true

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

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

const handleStart = () => {
  inputEL.disabled = true;
  startBtn.disabled = true;
  const intervalId = setInterval(() => {
    const ms = userSelectedDate.getTime() - new Date().getTime();
    const convertedData = convertMs(ms)

    if (ms <= 0) {
      clearInterval(intervalId);
      inputEL.disabled = false;
      spanDays.textContent = "00";
      spanHours.textContent = "00";
      spanMins.textContent = "00";
      spanSeconds.textContent = "00";
      return;
    }

    spanDays.textContent = addLeadingZero(convertedData.days)
    spanHours.textContent = addLeadingZero(convertedData.hours)
    spanMins.textContent = addLeadingZero(convertedData.minutes)
    spanSeconds.textContent = addLeadingZero(convertedData.seconds)
  }, 1000)
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDates[0].getTime() < new Date().getTime()) {
      startBtn.disabled = true
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
        backgroundColor: "lightred"
      })
    } else {
      userSelectedDate = selectedDate
      startBtn.disabled = false
    }
  },
};


flatpickr(inputEL, options)

startBtn.addEventListener("click", handleStart)