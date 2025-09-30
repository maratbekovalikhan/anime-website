document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById('genres-header');
  const list = document.getElementById('genres-list');

  // Проверяем сохранённое состояние
  const savedState = localStorage.getItem('genresOpen');
  if (savedState === "false") {
    list.classList.add('hidden');
    header.classList.remove('active');
  } else {
    list.classList.remove('hidden');
    header.classList.add('active');
  }

  header.addEventListener('click', () => {
    list.classList.toggle('hidden');
    header.classList.toggle('active');

    // Сохраняем новое состояние
    const isOpen = !list.classList.contains('hidden');
    localStorage.setItem('genresOpen', isOpen);
  });
});

