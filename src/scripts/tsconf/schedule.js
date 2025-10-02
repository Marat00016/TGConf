export default function initScheduleAnimation() {
  const openButton = document.querySelector(".open-schedule");
  const scheduleList = document.querySelector(".schedule__list");  

  let isOpenList = false;

  if (!openButton) return;

  openButton.addEventListener('click', () => {    
    if (!isOpenList) {
      scheduleList.classList.add('opened-list');
      isOpenList = true;
    } else {
      scheduleList.classList.remove('opened-list');
      isOpenList = false;
      setTimeout(() => {
        scheduleList.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }, 500);
    }
    openButton.textContent = isOpenList
      ? 'Скрыть'
      : 'Вся программа';
  })
}
