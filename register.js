// Ждём, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', () => {

  // ===== 📋 Форма регистрации =====
  const form = document.getElementById('register-form');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (!username || !email || !password || !confirmPassword) {
        alert('❌ Заполните все поля');
        return;
      }

      if (password.length < 6) {
        alert('❌ Пароль должен содержать минимум 6 символов');
        return;
      }

      if (password !== confirmPassword) {
        alert('❌ Пароли не совпадают');
        return;
      }

      // Если всё ок — показываем pop-up
      popup.style.display = 'flex';
    });

    closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
      form.reset();
    });
  }

  // ===== 🌙 Переключение темы =====
  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeBtn.textContent = '🌸';
    } else {
      themeBtn.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeBtn.textContent = isLight ? '🌸' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // ===== 📂 Аккордеон =====
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');
    title.addEventListener('click', () => {
      // Закрываем все остальные
      accordionItems.forEach(i => i !== item && i.classList.remove('active'));
      // Открываем текущий
      item.classList.toggle('active');
    });
  });

});

