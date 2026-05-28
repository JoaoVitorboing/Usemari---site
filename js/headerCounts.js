(() => {
  const favoritesCount = document.getElementById("favoritesCount");
  const cartCount = document.getElementById("cartCount");

  function atualizarContadoresHeader() {
    const favoritos = JSON.parse(localStorage.getItem("usemariFavorites")) || [];
    const carrinho = JSON.parse(localStorage.getItem("usemariCart")) || [];

    const totalFavoritos = favoritos.length;

    const totalCarrinho = carrinho.reduce((total, item) => {
      return total + item.quantidade;
    }, 0);

    if (favoritesCount) {
      favoritesCount.textContent = totalFavoritos;
      favoritesCount.classList.toggle("show", totalFavoritos > 0);
    }

    if (cartCount) {
      cartCount.textContent = totalCarrinho;
      cartCount.classList.toggle("show", totalCarrinho > 0);
    }
  }

  window.atualizarContadoresHeader = atualizarContadoresHeader;

  atualizarContadoresHeader();
})();