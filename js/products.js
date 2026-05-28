(() => {
  const productsLink = document.getElementById("productsLink");
  const productTabs = document.querySelectorAll(".product-tab");
  const productCards = document.querySelectorAll(".product-card");

  const openProductFilters = document.getElementById("openProductFilters");
  const closeProductFilters = document.getElementById("closeProductFilters");
  const productFilters = document.getElementById("productFilters");
  const productFilterOverlay = document.getElementById("productFilterOverlay");

  if (productsLink) {
    productsLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.appNavigation?.abrirProdutos();
    });
  }

  function filtrarPorCategoria(categoria) {
    productCards.forEach((card) => {
      const cardTab = card.dataset.tab;

      if (cardTab === categoria) {
        card.classList.remove("hide-product");
      } else {
        card.classList.add("hide-product");
      }
    });
  }

  productTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      productTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const categoria = tab.dataset.category;
      filtrarPorCategoria(categoria);
    });
  });

  function abrirFiltros() {
    productFilters?.classList.add("open");
    productFilterOverlay?.classList.add("show");
  }

  function fecharFiltros() {
    productFilters?.classList.remove("open");
    productFilterOverlay?.classList.remove("show");
  }

  if (openProductFilters) {
    openProductFilters.addEventListener("click", abrirFiltros);
  }

  if (closeProductFilters) {
    closeProductFilters.addEventListener("click", fecharFiltros);
  }

  if (productFilterOverlay) {
    productFilterOverlay.addEventListener("click", fecharFiltros);
  }

  filtrarPorCategoria("Todos");
})();
