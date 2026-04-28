// ========================
// HEADER E MENU MOBILE
// ========================

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".header");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    mobileMenuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
