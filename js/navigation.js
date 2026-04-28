(() => {
  const homeLink = document.getElementById("homeLink");
  const logoHome = document.getElementById("logoHome");

  function irParaHome(event) {
    if (event) event.preventDefault();

    if (window.appNavigation?.voltarParaHome) {
      window.appNavigation.voltarParaHome();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (homeLink) {
    homeLink.addEventListener("click", irParaHome);
  }

  if (logoHome) {
    logoHome.addEventListener("click", irParaHome);
  }
})();