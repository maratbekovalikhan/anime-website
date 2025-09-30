const header = document.getElementById('genres-header');
const list = document.getElementById('genres-list');
const arrow = document.getElementById('arrow');

header.addEventListener('click', () => {
  list.classList.toggle('hidden');
  header.classList.toggle('active');
});
