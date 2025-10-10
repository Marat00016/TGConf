export default function initTimer() {
  const endTime = new Date("2025-10-15T10:00:00").getTime();
  let days;
  let hours;
  let minutes;
  let seconds;
  const daysDiv = document.querySelector(".attention-days");
  const hoursDiv = document.querySelector(".attention-hours");
  const minutesDiv = document.querySelector(".attention-minutes");
  const secondsDiv = document.querySelector(".attention-seconds");
  function setTime() {
    const now = new Date().getTime();
    const distance = endTime - now;    
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance / 1000) % 60);
    daysDiv.innerHTML = `<p>${days}</p><span>${days === 1 ? 'день' : 'дня'}</span>`;
    hoursDiv.innerHTML = `<p>${hours}</p><span>${(hours < 5 && hours > 1) || (hours < 25 && hours > 21) ? 'часа' : (hours === 1 || hours === 21) ? 'час': 'часов'}</span>`;
    minutesDiv.innerHTML = `<p>${minutes}</p><span>минут</span>`;
    secondsDiv.innerHTML = `<p>${seconds}</p><span>секунд</span>`;
    if (endTime === now) {
      clearInterval(timerInterval)
    }
    console.log(days, '-', hours, '-', minutes);
  }
  setTime()
  const timerInterval = setInterval(setTime, 1000);
}
