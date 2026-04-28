(() => {
  const openCart = document.getElementById("openCart");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartList = document.getElementById("cartList");
  const backFromCart = document.getElementById("backFromCart");

  let carrinho = [];

  function renderizarCarrinho() {
    if (!cartList || !cartEmpty) return;

    if (carrinho.length === 0) {
      cartEmpty.style.display = "block";
      cartList.classList.remove("show");
      cartList.innerHTML = "";
      return;
    }

    cartEmpty.style.display = "none";
    cartList.classList.add("show");

    cartList.innerHTML = carrinho
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
        `,
      )
      .join("");

    cartList.querySelectorAll(".remove-favorite").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.dataset.index);
        removerDoCarrinho(index);
      });
    });
  }

  function adicionarAoCarrinho(nome, categoria = "Produto Usemari") {
    carrinho.push({ nome, categoria });
  }

  function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    renderizarCarrinho();
  }

  if (openCart) {
    openCart.addEventListener("click", (e) => {
      e.preventDefault();
      renderizarCarrinho();
      window.appNavigation?.abrirCarrinho();
    });
  }

  if (backFromCart) {
    backFromCart.addEventListener("click", () => {
      window.appNavigation?.voltarParaHome();
    });
  }

  window.adicionarAoCarrinho = adicionarAoCarrinho;
})();
