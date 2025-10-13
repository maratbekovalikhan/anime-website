// Ждём, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // отменяем стандартную отправку формы

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Простая валидация
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

  // Закрыть pop-up
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    form.reset(); // очищаем поля формы
  });
});
