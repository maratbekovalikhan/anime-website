

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

  /* ========== POPUP (modal) ========== */
  
  (function setupPopup() {
    // элемент модалки (создадим если еще нет)
    if (!document.getElementById('site-popup')) {
      const tpl = document.createElement('div');
      tpl.id = 'site-popup';
      tpl.innerHTML = `
        <div class="popup-overlay" data-popup-close>
          <div class="popup-window" role="dialog" aria-modal="true">
            <button class="popup-close" aria-label="Close">&times;</button>
            <div class="popup-body"></div>
          </div>
        </div>
      `;
      document.body.appendChild(tpl);

      // события закрытия
      tpl.querySelector('[data-popup-close]').addEventListener('click', (e) => {
        if (e.target.dataset.popupClose !== undefined || e.target.classList.contains('popup-close')) {
          closePopup();
        }
      });
      tpl.querySelector('.popup-close').addEventListener('click', closePopup);
    }

    // открыть попап с HTML-контентом
    window.openSitePopup = function(htmlContent) {
      const root = document.getElementById('site-popup');
      if (!root) return;
      root.style.display = 'block';
      root.querySelector('.popup-body').innerHTML = htmlContent;
      // prevent body scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    };

    // закрыть попап
    window.closePopup = function() {
      const root = document.getElementById('site-popup');
      if (!root) return;
      root.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    // любая кнопка с data-popup="..." откроет попап.
    // значение может быть "subscribe" или "contact" или прямой селектор HTML-id
    document.querySelectorAll('[data-popup]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.dataset.popup;
        if (type === 'subscribe') {
          openSubscribeForm();
        } else if (type === 'contact') {
          openContactForm();
        } else {
          // допустим, там html, покажем содержимое атрибута
          openSitePopup(btn.dataset.popupHtml || '');
        }
      });
    });

    // Примеры готовых форм (не используем валидацию — ваша задача)
    function openSubscribeForm() {
      const html = `
        <h3 style="margin-top:0">Subscribe to news</h3>
        <p>Enter your email to get updates.</p>
        <form id="subscribe-form">
          <input name="email" type="email" placeholder="Email" style="width:100%; padding:8px; margin:8px 0; border-radius:6px; border:1px solid #ccc">
          <div style="display:flex; gap:8px; justify-content:flex-end">
            <button type="button" id="subscribe-submit" class="btn">Subscribe</button>
            <button type="button" class="btn" onclick="closePopup()">Close</button>
          </div>
        </form>
      `;
      openSitePopup(html);
      // обработчик кнопки (только демонстрация)
      setTimeout(() => {
        const s = document.getElementById('subscribe-submit');
        if (s) s.addEventListener('click', () => {
          // просто подтверждение, без валидации
          alert('Subscription saved (demo).');
          closePopup();
        });
      }, 50);
    }

    function openContactForm() {
      const html = `
        <h3 style="margin-top:0">Contact us</h3>
        <form id="contact-form">
          <input name="name" placeholder="Your name" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc">
          <input name="email" type="email" placeholder="Email" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc">
          <textarea name="message" placeholder="Message" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc; min-height:100px"></textarea>
          <div style="display:flex; gap:8px; justify-content:flex-end">
            <button type="button" id="contact-submit" class="btn">Send</button>
            <button type="button" class="btn" onclick="closePopup()">Close</button>
          </div>
        </form>
      `;
      openSitePopup(html);
      setTimeout(() => {
        const s = document.getElementById('contact-submit');
        if (s) s.addEventListener('click', () => {
          alert('Message sent (demo).');
          closePopup();
        });
      }, 50);
    }
  })();


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

  /* ---------- POPUP (modal) ---------- */
  (function initPopup(){
    if (!document.getElementById('site-popup')) {
      const tpl = document.createElement('div');
      tpl.id = 'site-popup';
      tpl.innerHTML = `
        <div class="popup-overlay" data-popup-close>
          <div class="popup-window" role="dialog" aria-modal="true">
            <button class="popup-close" aria-label="Close">&times;</button>
            <div class="popup-body"></div>
          </div>
        </div>`;
      document.body.appendChild(tpl);

      // close by overlay or X
      tpl.addEventListener('click', (e) => {
        if (e.target.dataset.popupClose !== undefined || e.target.classList.contains('popup-close')) {
          closePopup();
        }
      });
    }

    window.openSitePopup = function(html) {
      const root = document.getElementById('site-popup');
      if (!root) return;
      root.style.display = 'block';
      const body = root.querySelector('.popup-body');
      body.innerHTML = html;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    };

    window.closePopup = function() {
      const root = document.getElementById('site-popup');
      if (!root) return;
      root.style.display = 'none';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };

    // attach to any [data-popup] buttons
    $$('[data-popup]').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.popup;
        if (type === 'subscribe') {
          openSubscribeForm();
        } else if (type === 'contact') {
          openContactForm();
        } else {
          openSitePopup(btn.dataset.popupHtml || '');
        }
      });
    });

    function openSubscribeForm(){
      openSitePopup(`
        <h3 style="margin-top:0">Subscribe</h3>
        <p>Enter your email to get news.</p>
        <form id="subscribe-form">
          <input name="email" type="email" placeholder="Email" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc">
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:8px">
            <button type="button" id="subscribe-submit" class="btn">Subscribe</button>
            <button type="button" class="btn" onclick="closePopup()">Close</button>
          </div>
        </form>`);
      setTimeout(()=> {
        const s = document.getElementById('subscribe-submit');
        if (s) s.addEventListener('click', () => { alert('Subscribed (demo)'); closePopup(); });
      }, 50);
    }
    function openContactForm(){
      openSitePopup(`
        <h3 style="margin-top:0">Contact us</h3>
        <form id="contact-form">
          <input name="name" placeholder="Your name" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc">
          <input name="email" type="email" placeholder="Email" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc">
          <textarea name="message" placeholder="Message" style="width:100%; padding:8px; margin:6px 0; border-radius:6px; border:1px solid #ccc; min-height:100px"></textarea>
          <div style="display:flex; gap:8px; justify-content:flex-end; margin-top:8px">
            <button type="button" id="contact-submit" class="btn">Send</button>
            <button type="button" class="btn" onclick="closePopup()">Close</button>
          </div>
        </form>`);
      setTimeout(()=> {
        const s = document.getElementById('contact-submit');
        if (s) s.addEventListener('click', () => { alert('Message sent (demo)'); closePopup(); });
      }, 50);
    }
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
