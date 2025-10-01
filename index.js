document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('genres-header');
  const list = document.getElementById('genres-list');
  const arrow = document.getElementById('arrow');

  header.addEventListener('click', () => {
    const isHidden = list.classList.toggle('hidden');
    header.setAttribute('aria-expanded', !isHidden);
    arrow.textContent = isHidden ? '▼' : '▲';
  });
});
