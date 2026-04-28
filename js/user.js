(() => {
  const openUserButtons = document.querySelectorAll(
    "#openUser, #openUserSearch",
  );
  const togglePassword = document.querySelector(".toggle-password");
  const senhaInput = document.getElementById("senha");

  const loginForm = document.getElementById("loginForm");
  const usuarioInput = document.getElementById("usuario");
  const userFormTitle = document.getElementById("userFormTitle");
  const userFormSubtitle = document.getElementById("userFormSubtitle");
  const submitUserForm = document.getElementById("submitUserForm");
  const toggleCadastro = document.getElementById("toggleCadastro");
  const userToggleText = document.getElementById("userToggleText");

  const welcomeToast = document.getElementById("welcomeToast");
  const welcomeToastText = document.getElementById("welcomeToastText");
  const closeWelcome = document.getElementById("closeWelcome");

  const googleLogin = document.getElementById("googleLogin");
  const appleLogin = document.getElementById("appleLogin");
  const facebookLogin = document.getElementById("facebookLogin");

  const userStatusText = document.getElementById("userStatusText");

  let modoCadastro = false;
  let welcomeTimeout;

  function atualizarModoFormulario() {
    if (
      !userFormTitle ||
      !userFormSubtitle ||
      !submitUserForm ||
      !userToggleText ||
      !toggleCadastro
    )
      return;

    if (modoCadastro) {
      userFormTitle.textContent = "Criar Conta";
      userFormSubtitle.textContent = "Cadastre-se para começar sua experiência";
      submitUserForm.textContent = "Cadastrar";
      userToggleText.textContent = "Já tem uma conta?";
      toggleCadastro.textContent = "Entrar";
    } else {
      userFormTitle.textContent = "Entrar";
      userFormSubtitle.textContent = "Bem-vinda de volta! Entre para continuar";
      submitUserForm.textContent = "Entrar";
      userToggleText.textContent = "Não tem uma conta?";
      toggleCadastro.textContent = "Criar conta";
    }
  }

  function mostrarBoasVindas(nome, provedor = "") {
    if (!welcomeToast || !welcomeToastText) return;

    const complemento = provedor ? ` via ${provedor}` : "";
    welcomeToastText.textContent = `Seja bem-vinda à Usemari, ${nome}${complemento}!`;

    welcomeToast.classList.add("show");

    clearTimeout(welcomeTimeout);
    welcomeTimeout = setTimeout(() => {
      welcomeToast.classList.remove("show");
    }, 4000);
  }

  function atualizarHeaderUsuario(nome) {
    if (!userStatusText) return;
    userStatusText.textContent = "";
  }

  function loginSocial(nome, provedor) {
    localStorage.setItem(
      "usemariUser",
      JSON.stringify({
        usuario: nome,
        senha: "",
        provedor,
      }),
    );

    atualizarHeaderUsuario(nome);
    mostrarBoasVindas(nome, provedor);
    window.appNavigation?.voltarParaHome();
  }

  openUserButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.appNavigation?.abrirUsuario();
    });
  });

  if (togglePassword && senhaInput) {
    togglePassword.addEventListener("click", () => {
      senhaInput.type = senhaInput.type === "password" ? "text" : "password";
    });
  }

  if (toggleCadastro) {
    toggleCadastro.addEventListener("click", (e) => {
      e.preventDefault();
      modoCadastro = !modoCadastro;
      atualizarModoFormulario();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = usuarioInput ? usuarioInput.value.trim() : "";
      const senha = senhaInput ? senhaInput.value.trim() : "";

      if (!usuario || !senha) {
        alert("Preencha usuário e senha.");
        return;
      }

      localStorage.setItem(
        "usemariUser",
        JSON.stringify({
          usuario,
          senha,
        }),
      );

      atualizarHeaderUsuario(usuario);
      mostrarBoasVindas(usuario);
      window.appNavigation?.voltarParaHome();
    });
  }

  if (googleLogin) {
    googleLogin.addEventListener("click", () => {
      loginSocial("Usuária Google", "Google");
    });
  }

  if (appleLogin) {
    appleLogin.addEventListener("click", () => {
      loginSocial("Usuária Apple", "Apple");
    });
  }

  if (facebookLogin) {
    facebookLogin.addEventListener("click", () => {
      loginSocial("Usuária Facebook", "Facebook");
    });
  }

  if (closeWelcome) {
    closeWelcome.addEventListener("click", () => {
      welcomeToast.classList.remove("show");
    });
  }

  const usuarioSalvo = localStorage.getItem("usemariUser");
  if (usuarioSalvo) {
    const dados = JSON.parse(usuarioSalvo);
    atualizarHeaderUsuario(dados.usuario);
  }

  atualizarModoFormulario();
})();
