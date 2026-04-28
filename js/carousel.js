// ========================
// CARROSSEL
// ========================

const heroBg1 = document.getElementById("heroBg1");
const heroBg2 = document.getElementById("heroBg2");
const dots = document.querySelectorAll(".dot");

const banners = ["image/banner1.jpg", "image/banner2.jpg", "image/banner3.jpg"];

let currentIndex = 0;
let activeBg = heroBg1;
let nextBg = heroBg2;

if (activeBg) {
  activeBg.style.backgroundImage = `url('${banners[currentIndex]}')`;
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function changeBanner(index) {
  if (!nextBg || !activeBg) return;

  nextBg.style.backgroundImage = `url('${banners[index]}')`;
  nextBg.classList.add("active");
  activeBg.classList.remove("active");

  updateDots(index);

  setTimeout(() => {
    const temp = activeBg;
    activeBg = nextBg;
    nextBg = temp;
  }, 1200);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    changeBanner(currentIndex);
  });
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % banners.length;
  changeBanner(currentIndex);
}, 5000);

updateDots(currentIndex);
