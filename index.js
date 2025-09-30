document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById('genres-header');
  const list = document.getElementById('genres-list');

  header.addEventListener('click', () => {
    list.classList.toggle('hidden');
    header.classList.toggle('active');
  });
});
