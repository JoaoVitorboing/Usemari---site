// ========================
// BUSCA
// ========================

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
    if (searchInput) searchInput.focus();
  }, 200);
}

function fecharBusca() {
  if (!searchModal) return;

  searchModal.classList.remove("active");
  document.body.style.overflow = "";

  if (searchInput) searchInput.value = "";
  if (searchResults) {
    searchResults.innerHTML = "";
    searchResults.classList.remove("show");
  }
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
