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