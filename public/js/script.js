// variável que checa se o toggle está clicado ou não
let toggleNavStatus = false;

let toggleNav = function () {
  let getSidebar = document.querySelector('.nav-sidebar');
  let getSidebarLinks = document.querySelectorAll('.nav-sidebar a');
  let logoBtnMenu = document.querySelector('.btn-toggle-nav');

  if (toggleNavStatus === false) {
    // abrir menu
    getSidebar.style.width = "250px";
    getSidebar.style.visibility = "visible";

    getSidebarLinks.forEach(link => {
      link.style.opacity = "1";
    });

    logoBtnMenu.style.backgroundColor = "var(--cinza-claro)";
    toggleNavStatus = true;
  } else {
    // fechar menu
    getSidebar.style.width = "0";
    getSidebar.style.visibility = "hidden";

    getSidebarLinks.forEach(link => {
      link.style.opacity = "0";
    });

    logoBtnMenu.style.backgroundColor = "var(--fundo-bege)";
    toggleNavStatus = false;
  }
};

// Fecha o menu automaticamente quando clicar em algum link
document.addEventListener("DOMContentLoaded", () => {
  let menuLinks = document.querySelectorAll(".nav-sidebar a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (toggleNavStatus) {
        toggleNav(); // chama a função para fechar
      }
    });
  });
});

function navegarListaEquipes() {
  window.location.href = "lista-equipes.html";
}