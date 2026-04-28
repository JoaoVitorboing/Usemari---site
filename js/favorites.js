(() => {
  const openFavorites = document.getElementById("openFavorites");
  const favoritesEmpty = document.getElementById("favoritesEmpty");
  const favoritesList = document.getElementById("favoritesList");
  const backToHome = document.getElementById("backToHome");

  let favoritos = [];

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
            <button class="remove-favorite" data-index="${index}">
              Remover
            </button>
          </div>
        `
      )
      .join("");

    favoritesList.querySelectorAll(".remove-favorite").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.dataset.index);
        removerFavorito(index);
      });
    });
  }

  function adicionarFavorito(nome, categoria = "Produto Usemari") {
    const jaExiste = favoritos.some((item) => item.nome === nome);
    if (!jaExiste) favoritos.push({ nome, categoria });
  }

  function removerFavorito(index) {
    favoritos.splice(index, 1);
    renderizarFavoritos();
  }

  if (openFavorites) {
    openFavorites.addEventListener("click", (e) => {
      e.preventDefault();
      renderizarFavoritos();
      window.appNavigation?.abrirFavoritos();
    });
  }

  if (backToHome) {
    backToHome.addEventListener("click", () => {
      window.appNavigation?.voltarParaHome();
    });
  }

  window.adicionarFavorito = adicionarFavorito;
})();