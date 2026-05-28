(() => {
  const openFavorites = document.getElementById("openFavorites");
  const favoritesEmpty = document.getElementById("favoritesEmpty");
  const favoritesList = document.getElementById("favoritesList");
  const backToHome = document.getElementById("backToHome");

  let favoritos = JSON.parse(localStorage.getItem("usemariFavorites")) || [];

  function salvarFavoritos() {
    localStorage.setItem("usemariFavorites", JSON.stringify(favoritos));
  }

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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

    favoritesList.innerHTML = `
      <div class="favorites-header">
        <div>
          <span>SEUS FAVORITOS</span>
          <h2>Peças que você amou</h2>
          <p>Salve suas escolhas preferidas e volte para elas quando quiser.</p>
        </div>

        <strong>${favoritos.length} ${favoritos.length === 1 ? "item" : "itens"}</strong>
      </div>

      <div class="favorites-grid">
        ${favoritos
          .map(
            (item, index) => `
              <article class="favorite-card">
                <div class="favorite-card-icon">♡</div>

                <div class="favorite-card-info">
                  <span>${item.categoria}</span>
                  <h3>${item.nome}</h3>
                  <p>Produto salvo na sua lista de favoritos Usemari.</p>
                </div>

                <div class="favorite-card-bottom">
                  <strong>${formatarPreco(item.preco || 0)}</strong>

                  <div class="favorite-card-actions">
                    <button
                      class="add-favorite-cart"
                      data-action="add-cart"
                      data-index="${index}"
                    >
                      Adicionar ao carrinho
                    </button>

                    <button
                      class="remove-favorite"
                      data-action="remove"
                      data-index="${index}"
                      aria-label="Remover favorito"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;

    favoritesList.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        const index = Number(button.dataset.index);
        const item = favoritos[index];

        if (action === "remove") {
          favoritos.splice(index, 1);
          salvarFavoritos();
          renderizarFavoritos();
          atualizarBotoesFavoritos();
          window.atualizarContadoresHeader?.();
        }

        if (action === "add-cart") {
          if (window.adicionarAoCarrinho) {
            window.adicionarAoCarrinho(item.nome, item.categoria, item.preco || 0);
          }
        }
      });
    });
  }

function adicionarFavorito(nome, categoria = "Produto Usemari", preco = 0, botao = null) {
  const index = favoritos.findIndex((item) => item.nome === nome);

  if (index !== -1) {
    favoritos.splice(index, 1);
    salvarFavoritos();
    renderizarFavoritos();
    atualizarBotoesFavoritos();
    window.atualizarContadoresHeader?.();

    if (botao) {
      botao.classList.remove("active");
      botao.textContent = "♡";
    }

    window.mostrarToastAcao?.(
      "Removido dos favoritos",
      `${nome} saiu da sua lista de favoritos.`
    );

    return;
  }

  favoritos.push({
    nome,
    categoria,
    preco,
  });

  salvarFavoritos();
  renderizarFavoritos();
  atualizarBotoesFavoritos(); 
  window.atualizarContadoresHeader?.();

  if (botao) {
    botao.classList.add("active");
    botao.textContent = "♥";
  }

  window.mostrarToastAcao?.(
    "Favorito adicionado",
    `${nome} foi salvo nos seus favoritos.`
  );
}

function atualizarBotoesFavoritos() {
  const botoes = document.querySelectorAll(".favorite-product-btn");

  botoes.forEach((botao) => {
    const nome = botao.dataset.name;
    const estaFavoritado = favoritos.some((item) => item.nome === nome);

    if (estaFavoritado) {
      botao.classList.add("active");
      botao.textContent = "♥";
    } else {
      botao.classList.remove("active");
      botao.textContent = "♡";
    }
  });
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
  atualizarBotoesFavoritos();
})();