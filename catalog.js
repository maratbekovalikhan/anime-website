// Добавление в закладки
document.querySelectorAll(".bookmark-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".anime-card");
    const anime = {
      title: card.querySelector("h3").innerText,
      genre: card.querySelector("p").innerText,
      img: card.querySelector("img").src
    };

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (!bookmarks.some(a => a.title === anime.title)) {
      bookmarks.push(anime);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      alert(`${anime.title} добавлен в закладки!`);
    } else {
      alert(`${anime.title} уже есть в закладках!`);
    }
  });
});



// Поиск по названию
document.getElementById("search").addEventListener("input", function () {
  const text = this.value.toLowerCase();
  document.querySelectorAll(".anime-card").forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(text) ? "block" : "none";
  });
});
