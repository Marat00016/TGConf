function fetchTgNominationData(nomination) {
  if (window.location.pathname.includes('awards')) {
    fetch('https://awards24.tgconf.ru/api.php?nomination_id=' + nomination)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const nominationBlog = document.querySelector(`.tg_block_${nomination}`);
        data.participants.sort((a, b) => a.percent - b.percent);
        data.participants.forEach(el => {
          const block = document.createElement('div');
          block.classList.add('block')

          const blockContainer = document.createElement('div');
          blockContainer.classList.add('block-container')
          block.append(blockContainer);

          const image = document.createElement('div');
          image.style.backgroundImage = `url(${el.icon_path})`
          image.classList.add('image-nomination')

          const name = document.createElement('div');
          name.textContent = `${el.name}`
          name.classList.add('name-nomination')

          const blockInfo = document.createElement('div');
          blockInfo.classList.add('block-container__info')
          blockInfo.append(image);
          blockInfo.append(name);
          blockContainer.append(blockInfo);

          const progress = document.createElement('div');
          progress.classList.add('progress-bar')
          blockContainer.append(progress);

          const progress2 = document.createElement('div');
          progress2.classList.add('progress-bar-fill')
          progress2.style.width = el.percent;
          blockContainer.append(progress2);

          const percent = document.createElement('div');
          percent.classList.add('percent')
          percent.textContent = `${el.percent}%`
          block.append(percent);

          nominationBlog.append(block);
        });
      })
      .catch(error => {
        console.error("Ошибка получения данных из API:", error);
      });
  }
}

export function fetchAllTgApiDatas() {
  fetchTgNominationData('16');
  fetchTgNominationData('17');
  fetchTgNominationData('18');
  fetchTgNominationData('19');
  fetchTgNominationData('20');
  fetchTgNominationData('24');
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(fetchAllTgApiDatas, 0);
});
