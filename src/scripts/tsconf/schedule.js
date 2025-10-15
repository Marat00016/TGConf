export default function initScheduleAnimation() {
  const openButton = document.querySelector(".open-schedule");
  const scheduleList = document.querySelectorAll(".schedule__list");
  const firstDate = document.querySelector(".left-ticket");
  const secondDate = document.querySelector(".right-ticket");
  const lists = document.querySelector(".schedule__lists");

  let isOpenList = false;

  if (!openButton) return;

  let setMaxHeight = () => {
    const id = getActiveListId();
    const openedList = document.querySelector(id + ' > div');
    console.log('SET MAX HEIGHT ' + id);
    console.log(openedList);

    if (openedList) {
      const openedListHeight = openedList.scrollHeight;
      lists.style.maxHeight = openedListHeight + 'px';
      console.log(openedListHeight + 'px')
    }
  }

  firstDate.addEventListener('click', () => {
    firstDate.classList.add('active');
    secondDate.classList.remove('active');
    lists.classList.remove('active');
    setMaxHeight();
  })

  secondDate.addEventListener('click', () => {
    secondDate.classList.add('active');
    firstDate.classList.remove('active');
    lists.classList.add('active');
    setMaxHeight();
  })

  let getActiveListId = () => {
    return firstDate.classList.contains('active') ?
      '#schedule-first-day' : '#schedule-second-day'
  }

  openButton.addEventListener('click', () => {
    if (!isOpenList) {
      scheduleList.forEach((item) => {
        if (item.classList.contains('opened-list')) {
          item.classList.remove('opened-list');
        }
        item.classList.add('opened-list');
      })

      setMaxHeight();

      isOpenList = true;
    } else {
      scheduleList.forEach((item) => {
        item.classList.remove('opened-list');
      })

      // Возвращаем исходную высоту при закрытии
      lists.style.maxHeight = isOpenList ? '4715px' : '6000px';

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
