const list = document.getElementById("bookmarks-list");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

if (bookmarks.length === 0) {
  list.innerHTML = "<p>Закладок пока нет 🙁</p>";
} else {
  bookmarks.forEach((anime, i) => {
    const card = document.createElement("article");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.img}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>${anime.genre}</p>
      <button onclick="removeBookmark(${i})">❌ Удалить</button>
    `;
    list.appendChild(card);
  });
}

function removeBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  location.reload();
}