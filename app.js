

document.addEventListener('DOMContentLoaded', () => {
  /* ========== ACCORDION ========== */
 
  document.querySelectorAll('.accordion').forEach(accordion => {
    accordion.addEventListener('click', (e) => {
      const title = e.target.closest('.accordion-title');
      if (!title) return;
      const item = title.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');

      // toggle
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        content.style.maxHeight = null;
        item.classList.remove('open');
      } else {
        // Закрыть другие в этом аккордионе (если нужно)
        accordion.querySelectorAll('.accordion-item.open').forEach(other => {
          other.classList.remove('open');
          const c = other.querySelector('.accordion-content');
          if (c) c.style.maxHeight = null;
        });
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    // установить начальную высоту (если открыто в разметке)
    accordion.querySelectorAll('.accordion-item .accordion-content').forEach(c => {
      if (c.parentElement.classList.contains('open')) {
        c.style.maxHeight = c.scrollHeight + 'px';
      } else {
        c.style.maxHeight = null;
      }
    });
  });




  /* ========== BACKGROUND SWITCHER ========== */
  (function bgSwitcher() {
    const presets = [
      "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
      "linear-gradient(135deg,#1f1c2c,#3a3a5a,#2b3672)",
      "linear-gradient(135deg,#06113a,#09203f,#0f3b3a)",
      "linear-gradient(135deg,#2b0036,#4b1b4f,#3e2a5a)"
    ];
    let idx = 0;
    // попытка безопасно считать текущий фон (если у body есть встроенный фон из CSS, мы не ломаем)
    const body = document.body;
    const original = getComputedStyle(body).backgroundImage || getComputedStyle(body).background;

    window.cycleBg = function() {
      idx = (idx + 1) % presets.length;
      body.style.transition = 'background 0.6s ease';
      body.style.background = presets[idx];
    };

    // Если на странице есть кнопка с id="bg-toggle-btn" — повесим обработчик
    const btn = document.getElementById('bg-toggle-btn');
    if (btn) btn.addEventListener('click', cycleBg);
    // Также добавим назначение на элементы с class .bg-toggle-btn
    document.querySelectorAll('.bg-toggle-btn').forEach(b => b.addEventListener('click', cycleBg));
  })();


  /* ========== DATE/TIME DISPLAY ========== */
  (function dateTime() {
    const el = document.getElementById('current-datetime');
    if (!el) return;
    function formatDate(d) {
      // Формат: 9 October 2024, 10:45
      const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0) hours = 12;
      minutes = minutes.toString().padStart(2,'0');
      return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    }
    function tick() {
      el.textContent = formatDate(new Date());
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ========== OPTIONAL: make popup triggers with keyboard (Esc) close ========== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof window.closePopup === 'function') window.closePopup();
    }
  });

});




document.addEventListener('DOMContentLoaded', () => {
  /* ---------- SAFETY: helper to query safely ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- ACCORDION ---------- */
  (function initAccordion(){
    const accordions = $$('.accordion');
    accordions.forEach(accordion => {
      // initialize maxHeights for open items
      $$('.accordion-item', accordion).forEach(item => {
        const cont = $('.accordion-content', item);
        if (!cont) return;
        if (item.classList.contains('open') || item.classList.contains('active')) {
          cont.style.maxHeight = cont.scrollHeight + 'px';
          item.classList.add('open');
        } else {
          cont.style.maxHeight = null;
        }
      });

      accordion.addEventListener('click', (e) => {
        const title = e.target.closest('.accordion-title');
        if (!title) return;
        const item = title.closest('.accordion-item');
        if (!item) return;
        const content = $('.accordion-content', item);
        const isOpen = item.classList.contains('open');
        // close other items
        $$('.accordion-item.open', accordion).forEach(other => {
          if (other === item) return;
          other.classList.remove('open');
          const c = $('.accordion-content', other);
          if (c) c.style.maxHeight = null;
        });
        if (isOpen) {
          item.classList.remove('open');
          if (content) content.style.maxHeight = null;
        } else {
          item.classList.add('open');
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  })();



  /* ---------- BACKGROUND CYCLE (optional) ---------- */
  (function initBgCycle(){
    const presets = [
      "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
      "linear-gradient(135deg,#fff0f6,#ffe6f2,#fff)",
      "linear-gradient(135deg,#06113a,#09203f,#0f3b3a)"
    ];
    let idx = 0;
    const btns = $$('.bg-toggle-btn');
    function cycle(){
      idx = (idx + 1) % presets.length;
      document.body.style.transition = 'background 0.6s ease';
      document.body.style.background = presets[idx];
    }
    btns.forEach(b => b.addEventListener('click', cycle));
    const btn = document.getElementById('bg-toggle-btn');
    if (btn) btn.addEventListener('click', cycle);
  })();

  /* ---------- DATE/TIME display (header and news) ---------- */
  (function initDateTime(){
    const el = document.getElementById('current-datetime');
    if (el) {
      function fmt(d){
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const day = d.getDate(); const month = months[d.getMonth()]; const year = d.getFullYear();
        let hours = d.getHours(); let minutes = d.getMinutes(); const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12; if (hours === 0) hours = 12;
        minutes = minutes.toString().padStart(2,'0');
        return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
      }
      el.textContent = fmt(new Date());
      setInterval(()=> el.textContent = fmt(new Date()), 1000);
    }
    const newsEl = document.getElementById('news-datetime');
    if (newsEl) {
      setInterval(()=> {
        const now = new Date();
        newsEl.textContent = now.toLocaleString();
      }, 1000);
    }
  })();

  /* ---------- INTERACTIVE WIDGETS: greeting, read-more, time, quote, sound, scroll-top ---------- */
  (function initInteractive(){
    const clickAudio = document.getElementById('clickSound');
    function playClick(){ if (clickAudio && clickAudio.play) { clickAudio.currentTime = 0; clickAudio.play().catch(()=>{}); } }

    const greetBtn = document.getElementById('greetBtn');
    if (greetBtn) {
      greetBtn.addEventListener('click', () => {
        const name = document.getElementById('nameInput') ? document.getElementById('nameInput').value.trim() : '';
        const greeting = document.getElementById('greetingText');
        playClick();
        if (greeting) greeting.textContent = name ? `Привет, ${name}! Добро пожаловать в мир Sakura` : 'Введите имя, пожалуйста';
      });
    }

    const readBtn = document.getElementById('readMoreBtn');
    if (readBtn) {
      readBtn.addEventListener('click', () => {
        const extra = document.getElementById('extraContent');
        if (!extra) return;
        if (extra.style.display === 'block') {
          extra.style.display = 'none';
        } else {
          extra.style.display = 'block';
        }
      });
    }

    const timeBtn = document.getElementById('timeBtn');
    if (timeBtn) {
      timeBtn.addEventListener('click', () => {
        const out = document.getElementById('timeDisplay');
        if (!out) return;
        out.textContent = new Date().toLocaleString();
        playClick();
      });
    }

    // random quotes (objects/arrays)
    const quotes = [
      {text:"Аниме — окно в другой мир.", author:"Team Sakura"},
      {text:"Истории, которые остаются с вами.", author:"AnimeWorld"},
      {text:"Каждый тайтл — новое приключение.", author:"Sakura"}
    ];
    const iSection = document.querySelector('.interactive-section');
    if (iSection) {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      const p = document.createElement('p');
      p.className = 'quote-box';
      p.textContent = `"${q.text}" — ${q.author}`;
      iSection.appendChild(p);
    }

    // scroll-to-top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.style.display = 'block'; else scrollBtn.style.display = 'none';
      });
      scrollBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    }

    // keyboard nav for header links (left/right)
    const navLinks = $$('.main-nav a');
    if (navLinks.length) {
      let idx = 0;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { idx = (idx + 1) % navLinks.length; navLinks[idx].focus(); }
        if (e.key === 'ArrowLeft') { idx = (idx - 1 + navLinks.length) % navLinks.length; navLinks[idx].focus(); }
      });
    }
  })();

  /* ---------- ESC closes popup ---------- */
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && typeof window.closePopup === 'function') window.closePopup(); });

}); // DOMContentLoaded end


// === ЕДИНЫЙ СКРИПТ ПОИСКА, ПОДСВЕТКИ И ПОДСКАЗОК ===
$(function () {
  // 1. Сохраняем оригинальные заголовки (чтобы потом восстанавливать)
  $(".anime-card h3").each(function () {
    const $t = $(this);
    $t.attr("data-original", $t.text().trim());
  });

  // 2. Собираем список всех названий аниме
  const animeTitles = $(".anime-card h3")
    .map(function () {
      return $(this).text().trim();
    })
    .get();

  const $input = $("#searchInput");
  const $list = $("#suggestionList");
  const $cards = $(".anime-card");

  // === Функции ===
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Подсветка совпадений в названиях
  function highlightTitles(term) {
    $(".anime-card h3").each(function () {
      const $h = $(this);
      const original = $h.attr("data-original");
      if (!term) {
        $h.html(original);
        return;
      }
      const regex = new RegExp("(" + escapeRegExp(term) + ")", "gi");
      const replaced = original.replace(regex, "<span class='highlight'>$1</span>");
      $h.html(replaced);
    });
  }


  // Подсказки при вводе
  function showSuggestions(term) {
    $list.empty();
    if (!term) {
      $list.hide();
      return;
    }

    const low = term.toLowerCase();
    const matches = animeTitles.filter(t => t.toLowerCase().includes(low));

    if (matches.length === 0) {
      $list.hide();
      return;
    }

    matches.forEach(title => {
      const regex = new RegExp("(" + escapeRegExp(term) + ")", "gi");
      const html = title.replace(regex, "<span class='highlight'>$1</span>");
      $list.append(`<li data-value="${title}">${html}</li>`);
    });

    $list.show();
  }

  // === События ===
 // при вводе
$input.on("input", function () {
  const value = $(this).val().trim();
  const selGenre = $(".catalog-filters select").val() || "";
  showSuggestions(value);
  filterCards(value, selGenre);
  highlightTitles(value);
});

// при клике на подсказку
$list.on("click", "li", function () {
  const val = $(this).data("value");
  const selGenre = $(".catalog-filters select").val() || "";
  $input.val(val);
  $list.hide();
  filterCards(val, selGenre);
  highlightTitles(val);
});

// при кнопке поиска
$("#searchBtn").on("click", function () {
  const value = $input.val().trim();
  const selGenre = $(".catalog-filters select").val() || "";
  filterCards(value, selGenre);
  highlightTitles(value);
  $list.hide();
});

// при смене жанра
$(".catalog-filters select").on("change", function () {
  const genre = $(this).val() || "";
  const value = $input.val().trim();
  filterCards(value, genre);
});


  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-box").length) {
      $list.hide();
    }
  });
});


// === ПРОЧИЕ ЭФФЕКТЫ И UI ===
$(document).ready(function () {
  console.log("jQuery ready ✅");

  // ===== Прогресс-бар при прокрутке =====
  $("body").prepend('<div id="scrollProgress"></div>');
  $("#scrollProgress").css({
    position: "fixed",
    top: 0,
    left: 0,
    height: "5px",
    background: "linear-gradient(90deg, #ff007f, #ffb6c1)",
    width: "0%",
    zIndex: 9999,
    transition: "width 0.2s ease"
  });

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();
    let docHeight = $(document).height() - $(window).height();
    let scrollPercent = (scrollTop / docHeight) * 100;
    $("#scrollProgress").css("width", scrollPercent + "%");
  });

  // ===== Анимированный счётчик =====
  $(".count").each(function () {
    let $this = $(this);
    let target = +$this.data("target");
    $({ countNum: 0 }).animate(
      { countNum: target },
      {
        duration: 2000,
        easing: "swing",
        step: function () {
          $this.text(Math.floor(this.countNum));
        },
        complete: function () {
          $this.text(this.countNum + "+");
        }
      }
    );
  });

  // ===== Всплывающее уведомление (toast) =====
  function showToast(message) {
    let $toast = $('<div class="toast-message">' + message + "</div>");
    $("body").append($toast);
    $toast.css({
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "#ff69b4",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      fontSize: "14px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      opacity: 0,
      zIndex: 9999
    });
    $toast.animate({ opacity: 1 }, 300);
    setTimeout(() => {
      $toast.animate({ opacity: 0 }, 500, function () {
        $(this).remove();
      });
    }, 3000);
  }

  // ===== Спиннер при отправке формы =====
  $("form").on("submit", function (e) {
    e.preventDefault();
    let $btn = $(this).find("button[type='submit']");
    let originalText = $btn.text();

    $btn.prop("disabled", true);
    $btn.html('<span class="spinner-border spinner-border-sm"></span> Пожалуйста, подождите…');

    setTimeout(() => {
      $btn.prop("disabled", false);
      $btn.text(originalText);
      showToast("Форма успешно отправлена!");
    }, 2000);
  });

  // ===== Кнопка "Скопировать" =====
  $(".copyBtn").on("click", function () {
    let textToCopy = $(this).siblings("p").text();
    navigator.clipboard.writeText(textToCopy);
    $(this).text("✅ Скопировано!");
    showToast("Текст скопирован!");
    setTimeout(() => {
      $(this).text("📋 Копировать");
    }, 2000);
  });

  // ===== Lazy loading изображений =====
  function lazyLoad() {
    $(".lazy").each(function () {
      let $img = $(this);
      if (
        $img.offset().top < $(window).scrollTop() + $(window).height() &&
        !$img.attr("src")
      ) {
        $img.attr("src", $img.data("src"));
      }
    });
  }
  $(window).on("scroll", lazyLoad);
  $(window).on("load", lazyLoad);
});

// === ФИЛЬТР АНИМЕ ПО НАЗВАНИЮ И ЖАНРУ ===
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#searchInput"); 
  const genreSelect = document.querySelector(".catalog-filters select");
  const cards = document.querySelectorAll(".anime-card");

  function filterAnime() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedGenre = genreSelect.value.trim().toLowerCase();

    cards.forEach(card => {
      const title = card.dataset.title?.toLowerCase() || "";
      const genres = card.querySelector("p")?.textContent.toLowerCase() || "";

      const matchesSearch = !searchText || title.includes(searchText);
      const matchesGenre = !selectedGenre || genres.includes(selectedGenre);

      // Показываем только те, что подходят под оба фильтра
      card.style.display = (matchesSearch && matchesGenre) ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterAnime);
  genreSelect.addEventListener("change", filterAnime);

  // Запускаем фильтр при загрузке страницы
  filterAnime();
});




// === Sakura Catalog Logic ===
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("filterSearch");
  const applyBtn = document.getElementById("applyFilters");
  const resetBtn = document.getElementById("resetFilters");
  const randomBtn = document.getElementById("randomAnime");
  const cards = document.querySelectorAll(".anime-card");

  // --- Применение фильтров ---
  function applyFilters() {
    const searchText = searchInput.value.toLowerCase();
    const selectedGenres = [...document.querySelectorAll(".genre-checkbox:checked")].map(c => c.value.toLowerCase());
    const selectedTypes = [...document.querySelectorAll(".type-checkbox:checked")].map(c => c.value.toLowerCase());
    const selectedAge = document.querySelector("input[name='age']:checked")?.value || "";

    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const info = card.querySelector("p").textContent.toLowerCase();
      let visible = true;

      // Поиск
      if (searchText && !title.includes(searchText)) visible = false;

      // Жанр
      if (selectedGenres.length && !selectedGenres.some(g => info.includes(g))) visible = false;

      // Тип
      if (selectedTypes.length && !selectedTypes.some(t => info.includes(t))) visible = false;

      // Возраст (для примера — по жанрам / ключевым словам)
      if (selectedAge && !info.includes(selectedAge)) visible = false;

      card.style.display = visible ? "block" : "none";
    });
  }

  // --- Сброс ---
  function resetFilters() {
    searchInput.value = "";
    document.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(el => el.checked = false);
    cards.forEach(card => (card.style.display = "block"));
    localStorage.removeItem("sakuraFilters");
  }

  // --- Случайный тайтл ---
  function randomAnime() {
    const visibleCards = [...cards].filter(c => c.style.display !== "none");
    if (!visibleCards.length) return alert("Нет подходящих тайтлов 🌸");
    const random = visibleCards[Math.floor(Math.random() * visibleCards.length)];
    random.scrollIntoView({ behavior: "smooth", block: "center" });
    random.classList.add("highlight");
    setTimeout(() => random.classList.remove("highlight"), 1000);
  }

  // --- Сохранение фильтров ---
  function saveFilters() {
    const state = {
      search: searchInput.value,
      genres: [...document.querySelectorAll(".genre-checkbox:checked")].map(c => c.value),
      types: [...document.querySelectorAll(".type-checkbox:checked")].map(c => c.value),
      age: document.querySelector("input[name='age']:checked")?.value || ""
    };
    localStorage.setItem("sakuraFilters", JSON.stringify(state));
  }

  // --- Восстановление фильтров ---
  function loadFilters() {
    const state = JSON.parse(localStorage.getItem("sakuraFilters") || "{}");
    if (state.search) searchInput.value = state.search;
    if (state.genres) state.genres.forEach(v => document.querySelector(`.genre-checkbox[value="${v}"]`)?.setAttribute("checked", true));
    if (state.types) state.types.forEach(v => document.querySelector(`.type-checkbox[value="${v}"]`)?.setAttribute("checked", true));
    if (state.age) document.querySelector(`input[name='age'][value="${state.age}"]`)?.setAttribute("checked", true);
  }

  loadFilters();

  // --- Обработчики ---
  applyBtn.addEventListener("click", () => {
    applyFilters();
    saveFilters();
  });
  resetBtn.addEventListener("click", resetFilters);
  randomBtn.addEventListener("click", randomAnime);
});

// === Главный поиск над карточками ===
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("mainSearchInput");
  const searchBtn = document.getElementById("mainSearchBtn");
  const cards = document.querySelectorAll(".anime-card");

  function searchAnime() {
    const query = searchInput.value.toLowerCase().trim();
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchBtn.addEventListener("click", searchAnime);
  searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") searchAnime();
  });
});


// === Переключение темы ===
document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("themeBtn");
  const body = document.body;

  // Проверка сохраненной темы
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
  } else {
    body.classList.add("dark-mode");
  }

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    // Сохраняем выбор пользователя
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  });
});

// Открытие / закрытие глобального поиска
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("globalSearchModal");
  const toggleBtn = document.getElementById("toggleSearch");
  const closeBtn = document.getElementById("closeGlobalSearch");
  const input = document.getElementById("globalSearchInput");

  toggleBtn.addEventListener("click", () => {
    modal.classList.add("active");
    input.focus();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
ыы
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.classList.remove("active");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("globalSearchModal");
  const toggleBtn = document.getElementById("toggleSearch");
  const closeBtn = document.getElementById("closeGlobalSearch");
  const input = document.getElementById("globalSearchInput");
  const results = document.getElementById("searchResults");
  const cards = document.querySelectorAll(".anime-card");

  // --- Открыть / закрыть модалку ---
  toggleBtn.addEventListener("click", () => {
    modal.classList.add("active");
    input.focus();
  });
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("active"); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") modal.classList.remove("active"); });

  // --- Реальный поиск по карточкам ---
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    results.innerHTML = "";

    if (query === "") {
      results.innerHTML = `<p class="placeholder-text">Начните вводить название тайтла 🌸</p>`;
      return;
    }

    const matches = Array.from(cards).filter(card => {
      const title = card.querySelector("h3")?.textContent.toLowerCase();
      return title.includes(query);
    });

    if (matches.length === 0) {
      results.innerHTML = `<p class="placeholder-text">Ничего не найдено 😢</p>`;
      return;
    }

    matches.forEach(card => {
      const img = card.querySelector("img")?.getAttribute("src");
      const title = card.querySelector("h3")?.textContent;
      const genre = card.querySelector("p")?.textContent;

      const item = document.createElement("div");
      item.className = "result-item";
      item.innerHTML = `
        <img src="${img}" alt="${title}">
        <div>
          <h4>${title}</h4>
          <p>${genre}</p>
        </div>
      `;

      // При клике — прокручивает к карточке на странице
      item.addEventListener("click", () => {
        modal.classList.remove("active");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.style.outline = "2px solid var(--accent-color, #ff4db8)";
        setTimeout(() => card.style.outline = "none", 1500);
      });

      results.appendChild(item);
    });
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('mainSearchInput');
  const searchBtn = document.getElementById('mainSearchBtn');
  const animeCards = document.querySelectorAll('.anime-card');

  const genreCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"][value]');
  const typeCheckboxes = document.querySelectorAll('.filter-group:nth-of-type(2) input[type="checkbox"]');
  const ageRadios = document.querySelectorAll('.filter-group:nth-of-type(3) input[type="radio"]');

  const applyFiltersBtn = document.getElementById('applyFilters');
  const resetFiltersBtn = document.getElementById('resetFilters');
  const randomAnimeBtn = document.getElementById('randomAnime');

  // Функция фильтрации
  function filterAnime() {
    const searchValue = searchInput.value.toLowerCase();

    const selectedGenres = Array.from(genreCheckboxes)
      .filter(ch => ch.checked)
      .map(ch => ch.value.toLowerCase());

    const selectedTypes = Array.from(typeCheckboxes)
      .filter(ch => ch.checked)
      .map(ch => ch.value.toLowerCase());

    const selectedAge = Array.from(ageRadios)
      .find(r => r.checked)?.value;

    animeCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const genres = card.querySelector('p').textContent.toLowerCase();
      
      let matchesSearch = title.includes(searchValue);
      let matchesGenre = selectedGenres.length ? selectedGenres.some(g => genres.includes(g)) : true;
      let matchesType = true; // Пока у нас нет типа в разметке, можно добавить data-type
      let matchesAge = true; // Пока у нас нет возраста в разметке, можно добавить data-age

      if (matchesSearch && matchesGenre && matchesType && matchesAge) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Поиск по кнопке
  searchBtn.addEventListener('click', filterAnime);

  // Фильтры по кнопке
  applyFiltersBtn.addEventListener('click', filterAnime);

  // Сброс фильтров
  resetFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    genreCheckboxes.forEach(ch => ch.checked = false);
    typeCheckboxes.forEach(ch => ch.checked = false);
    ageRadios.forEach(r => r.checked = false);
    animeCards.forEach(card => card.style.display = '');
  });

  // Случайный тайтл
  randomAnimeBtn.addEventListener('click', () => {
    const visibleCards = Array.from(animeCards).filter(c => c.style.display !== 'none');
    if (visibleCards.length) {
      const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
      randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      randomCard.style.animation = 'highlight 1s';
      setTimeout(() => randomCard.style.animation = '', 1000);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page; // data-page="planned", "watched", "dropped", "favorites"
  
  // Получаем соответствующий контейнер и список из localStorage
  const containers = {
    planned: document.getElementById("plannedGrid"),
    watched: document.getElementById("watchedGrid"),
    dropped: document.getElementById("droppedGrid"),
    favorites: document.getElementById("favoritesGrid")
  };

  const lists = {
    planned: JSON.parse(localStorage.getItem("planned")) || [],
    watched: JSON.parse(localStorage.getItem("watched")) || [],
    dropped: JSON.parse(localStorage.getItem("dropped")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
  };

  function render() {
    const grid = containers[page];
    const list = lists[page];

    grid.innerHTML = "";
    if (!list.length) {
      grid.innerHTML = `<p>Список пуст.</p>`;
      return;
    }

    list.forEach(anime => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <img src="${anime.img}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <p>${anime.genre}</p>
        ${getButtonHTML(page)}
      `;
      grid.appendChild(card);

      const btn = card.querySelector(".move-btn");
      if (btn) {
        btn.addEventListener("click", () => moveAnime(anime));
      }
    });
  }

  function getButtonHTML(currentPage) {
    switch(currentPage) {
      case "planned":
        return `<button class="move-btn btn btn-sm btn-primary">Переместить в Просмотрено</button>`;
      case "watched":
        return `<button class="move-btn btn btn-sm btn-primary">Добавить в Любимые</button>`;
      case "dropped":
      case "favorites":
        return ""; // нет кнопок для этих страниц
      default:
        return "";
    }
  }

  function moveAnime(anime) {
    if(page === "planned") {
      // Переместить в просмотрено
      lists["watched"].push(anime);
      lists["planned"] = lists["planned"].filter(a => a.title !== anime.title);
    } else if(page === "watched") {
      // Переместить в любимые
      lists["favorites"].push(anime);
      lists["watched"] = lists["watched"].filter(a => a.title !== anime.title);
    }

    // Обновляем localStorage
    Object.keys(lists).forEach(key => localStorage.setItem(key, JSON.stringify(lists[key])));
    render();
  }

  render();
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".bookmark-tab");
  const currentPage = window.location.pathname.split("/").pop(); // получает название файла

  tabs.forEach(tab => {
    const href = tab.getAttribute("href");
    if (href === currentPage) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
});






