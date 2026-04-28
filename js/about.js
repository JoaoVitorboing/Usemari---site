(() => {
  const aboutLink = document.getElementById("aboutLink");
  const welcomeToast = document.getElementById("welcomeToast");

  if (aboutLink) {
    aboutLink.addEventListener("click", (e) => {
      e.preventDefault();

      if (welcomeToast) {
        welcomeToast.classList.remove("show");
      }

      window.appNavigation?.abrirSobre();
    });
  }
})();
