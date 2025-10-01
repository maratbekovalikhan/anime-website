document.addEventListener("DOMContentLoaded", () => {
  const menuItem = document.getElementById("genres");
  const title = menuItem.querySelector(".menu-title");

  title.addEventListener("click", () => {
    menuItem.classList.toggle("active");
  });
});

