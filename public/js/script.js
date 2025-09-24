let toggleNavStatus = false;

let toggleNav = function () {
    let getSidebar = document.querySelector('.nav-sidebar');
    let getSidebarLinks = document.querySelectorAll('.nav-sidebar a');
    let logoBtnMenu = document.querySelector('.btn-toggle-nav');

    if (toggleNavStatus === false) {
        getSidebar.style.width = "250px";
        getSidebar.style.visibility = "visible";

        getSidebarLinks.forEach(link => {
            link.style.opacity = "1";
        });

        logoBtnMenu.style.backgroundColor = "var(--fundo-bege)";
        toggleNavStatus = true;
    } else {
        getSidebar.style.width = "0";
        getSidebar.style.visibility = "hidden";

        getSidebarLinks.forEach(link => {
            link.style.opacity = "0";
        });

        logoBtnMenu.style.backgroundColor = "var(--fundo-bege)";
        toggleNavStatus = false;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let menuLinks = document.querySelectorAll(".nav-sidebar a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (toggleNavStatus) {
                toggleNav();
            }
        });
    });
});

function navegarListaEquipes() {
    window.location.href = "../public/html/lista-equipes.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.querySelector('.contact-button');

    if (contactButton) {
        contactButton.addEventListener('click', () => {
            alert('Você clicou no botão CONTATO! Aqui você pode adicionar lógica para abrir um formulário, modal ou link de contato.');
            // Exemplo: window.location.href = 'mailto:equipe.mont9305@email.com';
        });
    }

    // Adiciona funcionalidade de hover/focus para os ícones sociais (exemplo)
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            console.log(`Hover em: ${icon.title}`);
        });
        icon.addEventListener('focus', () => {
            console.log(`Foco em: ${icon.title}`);
        });
    });
});