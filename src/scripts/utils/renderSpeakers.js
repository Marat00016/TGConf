// ================================
// КОНФИГУРАЦИЯ
// ================================
const SPEAKERS_URL = "'https://clickise.org/speakers.json";
const CACHE_KEY = "tgconf_speakers_v2"; // Ключ кэша
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

// ================================
// ХЕЛПЕРЫ
// ================================
function splitFirstName(name) {
  return name?.split(" ")[0] || "";
}

function splitLastName(name) {
  return name?.split(" ")[1] || "";
}

function initFancybox() {
  if (typeof $.fancybox !== "undefined") {
    setTimeout(() => {
      $("[data-fancybox]").fancybox({
        // Можно настроить, если нужно
      });
    }, 300);
  }
}

// ================================
// ОСНОВНАЯ ФУНКЦИЯ ЗАГРУЗКИ
// ================================
export async function loadSpeakers() {
  let speakers = null;

  // 1. Попробуем кэш
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        speakers = data;
        console.log("✅ Спикеры загружены из кэша");
      }
    } catch (e) {
      console.warn("Кэш повреждён, загружаем с сервера");
    }
  }

  // 2. Если нет в кэше — грузим с сервера
  if (!speakers) {
    try {
      console.log("📡 Загружаем спикеров с сервера...");
      const response =  await fetch('https://clickise.org/speakers.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      speakers = await response.json();

      // Сохраняем в кэш
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: speakers,
          timestamp: Date.now(),
        })
      );
      console.log("✅ Спикеры загружены и сохранены в кэш");
    } catch (error) {
      console.error("❌ Не удалось загрузить спикеров:", error);
      showError("Не удалось загрузить спикеров. Проверьте подключение.");
      return;
    }
  }

  // 3. Рендерим всё
  renderSpeakerCards(speakers);
  renderModals(speakers);
  initFancybox();
}

// ================================
// РЕНДЕР КАРТОЧЕК
// ================================
function renderSpeakerCards(speakers) {
  const container = document.getElementById("speakers-cards-container");
  if (!container) return;

  container.innerHTML = "";

  speakers.forEach((speaker) => {
    const firstName = splitFirstName(speaker.name);
    const lastName = splitLastName(speaker.name);

    const logosHTML =
      speaker.logos?.length > 0
        ? `
          <div class="speakers__logos">
            <div class="speakers__logo-wrapper">
              ${speaker.logos
                .map(
                  (logo) => `
                <div 
                  class="speakers__logo" 
                  style="background-image: url(${logo.src});" 
                  title="${logo.alt || ""}" 
                  aria-label="${logo.alt || "Логотип"}">
                </div>
              `
                )
                .join("")}
            </div>
          </div>`
        : "";

    const colorClass = speaker.color ? ` ${speaker.color}` : "";

    const card = document.createElement("button");
    card.type = "button";
    card.className = `speakers__card ${speaker.id.replace("speaker-", "")}`;
    card.setAttribute("data-fancybox", "");
    card.setAttribute("data-src", `#${speaker.id}`);

    card.innerHTML = `
        <div class="speakers__card-main${colorClass}">
          <img loading="lazy" src="${speaker.image}" alt="${speaker.name}" />
          ${logosHTML}
        </div>
        <span class="speakers__card__name">
          ${firstName} <br> ${lastName}
        </span>
        <div class="speakers__content-wrapper">
          <p class="speakers__card__description">
            ${speaker.position}
          </p>
          <div class="speakers__open-modal-button"></div>
        </div>
      `;

    container.appendChild(card);
  });
}

// ================================
// РЕНДЕР МОДАЛОК
// ================================
function renderModals(speakers) {
  let modalsContainer = document.getElementById("modals-container");

  // Создаём, если нет
  if (!modalsContainer) {
    modalsContainer = document.createElement("div");
    modalsContainer.id = "modals-container";
    document.body.appendChild(modalsContainer);
  }

  modalsContainer.innerHTML = "";

  speakers.forEach((speaker) => {
    const firstName = splitFirstName(speaker.name);
    const lastName = splitLastName(speaker.name);

    const modal = document.createElement("div");
    modal.className = "tg-modal-config tg-modal-config-user";
    modal.id = speaker.id;
    modal.style.display = "none";

    modal.innerHTML = `
        <div class="tg-modal-config-user__header">
          <img src="${speaker.image}" alt="${speaker.name}" loading="lazy" />
          <span>
            ${firstName} <br> ${lastName}
          </span>
        </div>
        <p class="tg-modal-config-user__text">
          ${speaker.position}
        </p>
      `;

    modalsContainer.appendChild(modal);
  });
}

// ================================
// ПОКАЗ ОШИБКИ
// ================================
function showError(message) {
  const container = document.getElementById("speakers-cards-container");
  if (container) {
    container.innerHTML = `
        <p style="
          color: #ff5c5c;
          text-align: center;
          width: 100%;
          font-size: 14px;
          line-height: 1.5;
          padding: 20px;
          margin: 10px 0;
          background: #fff8f8;
          border: 1px solid #ffd6d6;
          border-radius: 8px;
        ">
          ${message}
        </p>
      `;
  }
}
