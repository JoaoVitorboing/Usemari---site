(() => {
  const openCart = document.getElementById("openCart");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartList = document.getElementById("cartList");
  const backFromCart = document.getElementById("backFromCart");

  let carrinho = JSON.parse(localStorage.getItem("usemariCart")) || [];

  function salvarCarrinho() {
    localStorage.setItem("usemariCart", JSON.stringify(carrinho));
  }

  function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function atualizarBotoesCarrinho() {
    const botoes = document.querySelectorAll(".cart-product-btn");

    botoes.forEach((botao) => {
      const nome = botao.dataset.name;
      const estaNoCarrinho = carrinho.some((item) => item.nome === nome);

      if (estaNoCarrinho) {
        botao.classList.add("added");
        botao.textContent = "✓";
      } else {
        botao.classList.remove("added");
        botao.textContent = "+";
      }
    });
  }

  function renderizarCarrinho() {
    if (!cartList || !cartEmpty) return;

    if (carrinho.length === 0) {
      cartEmpty.style.display = "block";
      cartList.classList.remove("show");
      cartList.innerHTML = "";

      atualizarBotoesCarrinho();
      return;
    }

    cartEmpty.style.display = "none";
    cartList.classList.add("show");

    const total = carrinho.reduce((soma, item) => {
      return soma + item.preco * item.quantidade;
    }, 0);

    cartList.innerHTML = `
      <div class="cart-items">
        ${carrinho
          .map(
            (item, index) => `
              <div class="cart-item">
                <div class="cart-item-info">
                  <span class="cart-category">${item.categoria}</span>
                  <h3>${item.nome}</h3>
                  <p>${formatarPreco(item.preco)}</p>
                </div>

                <div class="cart-item-controls">
                  <div class="quantity-control">
                    <button data-action="decrease" data-index="${index}">−</button>
                    <span>${item.quantidade}</span>
                    <button data-action="increase" data-index="${index}">+</button>
                  </div>

                  <strong>${formatarPreco(item.preco * item.quantidade)}</strong>

                  <button class="remove-cart-item" data-action="remove" data-index="${index}">
                    Remover
                  </button>
                </div>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="cart-summary">
        <div>
          <span>Total</span>
          <strong>${formatarPreco(total)}</strong>
        </div>

        <button class="btn-cart-checkout">Finalizar Compra</button>
      </div>
    `;

    cartList.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.action;
        const index = Number(button.dataset.index);

        if (action === "increase") {
          carrinho[index].quantidade++;
        }

        if (action === "decrease") {
          carrinho[index].quantidade--;

          if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
          }
        }

        if (action === "remove") {
          carrinho.splice(index, 1);
        }

        salvarCarrinho();
        renderizarCarrinho();
        atualizarBotoesCarrinho();
        window.atualizarContadoresHeader?.();
      });
    });

    atualizarBotoesCarrinho();
  }

  function adicionarAoCarrinho(
    nome,
    categoria = "Produto Usemari",
    preco = 0,
    botao = null
  ) {
    const index = carrinho.findIndex((item) => item.nome === nome);

    if (index !== -1) {
      carrinho.splice(index, 1);

      window.mostrarToastAcao?.(
        "Produto removido",
        `${nome} foi removido do carrinho.`
      );
    } else {
      carrinho.push({
        nome,
        categoria,
        preco,
        quantidade: 1,
      });

      window.mostrarToastAcao?.(
        "Produto no carrinho",
        `${nome} foi adicionado ao seu carrinho.`
      );
    }

    salvarCarrinho();
    renderizarCarrinho();
    atualizarBotoesCarrinho();
    window.atualizarContadoresHeader?.();
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

  atualizarBotoesCarrinho();
})();