document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('genres-header');
  const list = document.getElementById('genres-list');
  const arrow = document.getElementById('arrow');

  if (!header || !list) {
    console.error('Accordion: элемент(ы) не найден(ы). Проверь id: "genres-header" и "genres-list".', { header, list });
    return;
  }

  function setOpen(open, save = true) {
    if (open) {
      list.classList.remove('hidden');
      header.classList.add('active');
      header.setAttribute('aria-expanded', 'true');
      if (arrow) arrow.textContent = '▲';
    } else {
      list.classList.add('hidden');
      header.classList.remove('active');
      header.setAttribute('aria-expanded', 'false');
      if (arrow) arrow.textContent = '▼';
    }
    if (save) localStorage.setItem('genresOpen', open ? '1' : '0');
    console.log('Accordion: state =', open);
  }

  // Прочитать сохранённое состояние (1 = open, 0 = closed). По умолчанию открыто.
  const saved = localStorage.getItem('genresOpen');
  const open = saved === null ? true : saved === '1';
  setOpen(open, false);

  header.addEventListener('click', () => {
    const isOpen = !list.classList.contains('hidden'); // true если сейчас открыт
    setOpen(!isOpen, true); // переключаем
  });

  // Доступность: реагировать на Enter и Space
  header.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});
