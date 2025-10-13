export default function initScheduleAnimation() {
  const openButton = document.querySelector(".open-schedule");
  const scheduleList = document.querySelectorAll(".schedule__list");
  const firstDate = document.querySelector(".left-ticket");
  const secondDate = document.querySelector(".right-ticket");
  const lists = document.querySelector(".schedule__lists");

  let isOpenList = false;

  if (!openButton) return;

  firstDate.addEventListener('click', () => {
    firstDate.classList.add('active');
    secondDate.classList.remove('active');
    lists.classList.remove('active');
    lists.style.maxHeight = '6000px';
  })
  
  secondDate.addEventListener('click', () => {
    secondDate.classList.add('active');
    firstDate.classList.remove('active');
    lists.classList.add('active');
    lists.style.maxHeight = '4715px';
  })

  openButton.addEventListener('click', () => {
    if (!isOpenList) {
      scheduleList.forEach((item) => {
        item.classList.add('opened-list');  
      })
      isOpenList = true;
    } else {
      scheduleList.forEach((item) => {
        item.classList.remove('opened-list');  
      })
      isOpenList = false;
      setTimeout(() => {
        scheduleList[0].scrollIntoView({
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
