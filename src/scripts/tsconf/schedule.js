export default function initScheduleAnimation() {
  const openButton = document.querySelector(".open-schedule");
  const scheduleList = document.querySelector(".schedule__list");
  const firstDate = document.querySelector(".left-ticket");
  const secondDate = document.querySelector(".right-ticket");
  const speakersList = document.querySelector(".left-list");
  const lists = speakersList.querySelectorAll('.double');

  console.log(lists);  

  let isOpenList = false;

  if (!openButton) return;

  firstDate.addEventListener('click', () => {
    firstDate.classList.add('active');
    secondDate.classList.remove('active');
    lists.forEach((item) => {
      item.classList.remove('active');
    })
  })
  
  secondDate.addEventListener('click', () => {
    secondDate.classList.add('active');
    firstDate.classList.remove('active');
    lists.forEach((item) => {
      item.classList.add('active');  
    })
  })

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
