(() => {
  const productsLink = document.getElementById("productsLink");

  if (productsLink) {
    productsLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.appNavigation?.abrirProdutos();
    });
  }
})();
