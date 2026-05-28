(() => {
  const mainContent = document.getElementById("mainContent");
  const favoritesPage = document.getElementById("favoritesPage");
  const cartPage = document.getElementById("cartPage");
  const userPage = document.getElementById("userPage");
  const aboutPage = document.getElementById("aboutPage");
  const productsPage = document.getElementById("productsPage");

  function setActiveMenu(activeId) {
    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.getElementById(activeId);

    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  function resetPage(page) {
    if (!page) return;
    page.classList.remove("show");
    page.style.display = "none";
    page.offsetHeight;
  }

  function abrirTela(page) {
    if (!page || !mainContent) return;

    const welcomeToast = document.getElementById("welcomeToast");

    if (welcomeToast) {
      welcomeToast.classList.remove("show");
    }

    const telas = [favoritesPage, cartPage, userPage, aboutPage, productsPage];

    const telaAtual = telas.find((p) => p && p.classList.contains("show"));

    if (telaAtual) {
      telaAtual.classList.remove("show");

      setTimeout(() => {
        resetPage(telaAtual);

        page.style.display = "block";
        page.offsetHeight;
        page.classList.add("show");

        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 250);

      return;
    }

    mainContent.classList.add("hide");

    setTimeout(() => {
      mainContent.style.display = "none";

      page.style.display = "block";
      page.offsetHeight;
      page.classList.add("show");

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 350);
  }

  function voltarParaHome() {
    if (!mainContent) return;

    resetPage(favoritesPage);
    resetPage(cartPage);
    resetPage(userPage);
    resetPage(aboutPage);
    resetPage(productsPage);

    mainContent.style.display = "block";
    mainContent.classList.add("hide");
    mainContent.offsetHeight;
    mainContent.classList.remove("hide");

    setActiveMenu("homeLink");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  let actionToastTimeout;

function mostrarToastAcao(titulo, texto) {
  const toast = document.getElementById("actionToast");
  const toastTitle = document.getElementById("actionToastTitle");
  const toastText = document.getElementById("actionToastText");

  if (!toast || !toastTitle || !toastText) return;

  toastTitle.textContent = titulo;
  toastText.textContent = texto;

  toast.classList.add("show");

  clearTimeout(actionToastTimeout);
  actionToastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


  window.appNavigation = {
    abrirFavoritos: () => {
      setActiveMenu("");
      abrirTela(favoritesPage);
    },

    abrirCarrinho: () => {
      setActiveMenu("");
      abrirTela(cartPage);
    },

    abrirUsuario: () => {
      setActiveMenu("");
      abrirTela(userPage);
    },

    abrirSobre: () => {
      setActiveMenu("aboutLink");
      abrirTela(aboutPage);
    },

    abrirProdutos: () => {
      setActiveMenu("productsLink");
      abrirTela(productsPage);
    },

    voltarParaHome,
  };
  window.mostrarToastAcao = mostrarToastAcao;
})();
