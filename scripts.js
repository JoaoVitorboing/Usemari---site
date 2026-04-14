const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const heroBg1 = document.getElementById("heroBg1");
const heroBg2 = document.getElementById("heroBg2");
const dots = document.querySelectorAll(".dot");

const banners = ["image/banner1.jpg", "image/banner2.jpg", "image/banner3.jpg"];
const header = document.querySelector(".header");

let currentIndex = 0;
let activeBg = heroBg1;
let nextBg = heroBg2;

activeBg.style.backgroundImage = `url('${banners[currentIndex]}')`;

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function changeBanner(index) {
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

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    mobileMenuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });
}

updateDots(currentIndex);

// ===== BUSCA =====

const openSearch = document.getElementById("openSearch");
const closeSearch = document.getElementById("closeSearch");
const searchModal = document.getElementById("searchModal");
const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const produtos = [
  "Vestido Azul Longo",
  "Vestido Preto Midi",
  "Vestido Vermelho Elegante",
  "Saia Floral",
  "Saia Midi Rosa",
  "Cropped Branco",
  "Cropped Canelado",
  "Body Rosa",
  "Body Preto",
  "Conjunto Feminino",
];

function abrirBusca() {
  if (!searchModal) return;

  searchModal.classList.add("active");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    searchInput.focus();
  }, 200);
}

function fecharBusca() {
  if (!searchModal) return;

  searchModal.classList.remove("active");
  document.body.style.overflow = "";
  searchInput.value = "";
  searchResults.innerHTML = "";
  searchResults.classList.remove("show");
}

function renderizarResultados(valor) {
  const termo = valor.trim().toLowerCase();

  if (!termo) {
    searchResults.innerHTML = "";
    searchResults.classList.remove("show");
    return;
  }

  const filtrados = produtos.filter((produto) =>
    produto.toLowerCase().includes(termo),
  );

  searchResults.classList.add("show");

  if (filtrados.length === 0) {
    searchResults.innerHTML = `<div class="no-results">Nenhum produto encontrado.</div>`;
    return;
  }

  searchResults.innerHTML = filtrados
    .map((produto) => `<div class="search-result-item">${produto}</div>`)
    .join("");
}

// eventos
if (openSearch) openSearch.addEventListener("click", abrirBusca);
if (closeSearch) closeSearch.addEventListener("click", fecharBusca);
if (searchOverlay) searchOverlay.addEventListener("click", fecharBusca);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchModal?.classList.contains("active")) {
    fecharBusca();
  }
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    renderizarResultados(e.target.value);
  });
}

// ===== FAVORITOS EM TELA ÚNICA =====

const openFavorites = document.getElementById("openFavorites");
const favoritesPage = document.getElementById("favoritesPage");
const favoritesEmpty = document.getElementById("favoritesEmpty");
const favoritesList = document.getElementById("favoritesList");
const mainContent = document.getElementById("mainContent");
const backToHome = document.getElementById("backToHome");

let favoritos = [];

function abrirFavoritos() {
  if (!favoritesPage || !mainContent) return;

  mainContent.style.display = "none";
  favoritesPage.classList.add("show");
  renderizarFavoritos();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function voltarParaHome() {
  if (!favoritesPage || !mainContent) return;

  favoritesPage.classList.remove("show");
  mainContent.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderizarFavoritos() {
  if (!favoritesList || !favoritesEmpty) return;

  if (favoritos.length === 0) {
    favoritesEmpty.style.display = "block";
    favoritesList.classList.remove("show");
    favoritesList.innerHTML = "";
    return;
  }

  favoritesEmpty.style.display = "none";
  favoritesList.classList.add("show");

  favoritesList.innerHTML = favoritos
    .map(
      (item, index) => `
        <div class="favorite-item">
          <div class="favorite-item-info">
            <h4>${item.nome}</h4>
            <p>${item.categoria}</p>
          </div>
          <button class="remove-favorite" onclick="removerFavorito(${index})">
            Remover
          </button>
        </div>
      `
    )
    .join("");
}

function adicionarFavorito(nome, categoria = "Produto Usemari") {
  const jaExiste = favoritos.some((item) => item.nome === nome);

  if (!jaExiste) {
    favoritos.push({ nome, categoria });
  }
}

function removerFavorito(index) {
  favoritos.splice(index, 1);
  renderizarFavoritos();
}

if (openFavorites) {
  openFavorites.addEventListener("click", abrirFavoritos);
}

if (backToHome) {
  backToHome.addEventListener("click", voltarParaHome);
}

function abrirFavoritos() {
  mainContent.style.display = "none";
  favoritesPage.classList.add("show");
  renderizarFavoritos();

  setActiveMenu("favoritesLink"); // 👈 aqui
}

function abrirFavoritos() {
  if (!favoritesPage || !mainContent) return;

  // anima saída da home
  mainContent.classList.add("fade-out");

  setTimeout(() => {
    mainContent.style.display = "none";

    // mostra favoritos
    favoritesPage.style.display = "flex";

    setTimeout(() => {
      favoritesPage.classList.add("fade-in");
      favoritesPage.classList.add("show");
    }, 50);

    renderizarFavoritos();
  }, 300);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== VOLTAR PRA HOME =====

const homeLink = document.getElementById("homeLink");
const logoHome = document.getElementById("logoHome");

function irParaHome(e) {
  if (e) e.preventDefault();

  // se estiver na página de favoritos
  if (favoritesPage.classList.contains("show")) {
    voltarParaHome();
  } else {
    // se já estiver na home, só sobe pro topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

if (homeLink) {
  homeLink.addEventListener("click", irParaHome);
}

if (logoHome) {
  logoHome.addEventListener("click", irParaHome);
}
function voltarParaHome() {
  favoritesPage.classList.remove("show");
  mainContent.style.display = "block";

  setActiveMenu("homeLink"); // 👈 aqui
}

function voltarParaHome() {
  if (!favoritesPage || !mainContent) return;

  // anima saída dos favoritos
  favoritesPage.classList.remove("fade-in");
  favoritesPage.classList.add("fade-out");

  setTimeout(() => {
    favoritesPage.style.display = "none";
    favoritesPage.classList.remove("show", "fade-out");

    // mostra home
    mainContent.style.display = "block";

    setTimeout(() => {
      mainContent.classList.remove("fade-out");
      mainContent.classList.add("fade-in");
    }, 50);
  }, 300);

  window.scrollTo({ top: 0, behavior: "smooth" });
}


function setActiveMenu(activeId) {
  const links = document.querySelectorAll(".nav a");

  links.forEach(link => link.classList.remove("active"));

  const activeLink = document.getElementById(activeId);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}