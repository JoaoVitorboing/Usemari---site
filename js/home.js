(() => {
  const exploreCollectionBtn = document.getElementById("exploreCollectionBtn");
  const historyBtn = document.getElementById("historyBtn");
  const viewAllCollectionBtn = document.getElementById("viewAllCollectionBtn");
  const fullCollectionBtn = document.getElementById("fullCollectionBtn");

  function irParaProdutos(event) {
    event.preventDefault();
    window.appNavigation?.abrirProdutos();
  }

  function irParaSobre(event) {
    event.preventDefault();
    window.appNavigation?.abrirSobre();
  }

  if (exploreCollectionBtn) {
    exploreCollectionBtn.addEventListener("click", irParaProdutos);
  }

  if (viewAllCollectionBtn) {
    viewAllCollectionBtn.addEventListener("click", irParaProdutos);
  }

  if (fullCollectionBtn) {
    fullCollectionBtn.addEventListener("click", irParaProdutos);
  }

  if (historyBtn) {
    historyBtn.addEventListener("click", irParaSobre);
  }
})();