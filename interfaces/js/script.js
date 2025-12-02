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

        logoBtnMenu.style.backgroundColor = "var(--cinza-bem-claro)";
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

const equipesContatos = [
    {
        id: 'caustorms',
        nome: 'Caustorms #9305',
        email: 'caustorms@gmail.com',
        instagram: '@caustorms',
        website: 'https://caustorms.com'
    },
    {
        id: 'gc4tomorrow',
        nome: 'GC 4Tomorrow #11105',
        email: 'frcteam11105@gmail.com',
        instagram: '@gc4tomorrow',
        website: 'https://gc4tomorrow.com'
    },
    {
        id: 'spacetech',
        nome: 'Space Tech #23504',
        email: 'spacetech@gmail.com',
        instagram: '@spacetech.ftc',
        website: 'https://spacetech.com'
    },
    {
        id: 'grt',
        nome: 'GRT - Scuderia #14391',
        email: 'scuderiagrt@gmail.com',
        instagram: '@scuderiagrt',
        website: 'https://scuderiagrt.com'
    }
];

let openFilterOverlay = function () {
    let filterOverlay = document.getElementById('filterOverlay');
    if (filterOverlay) {
        filterOverlay.style.display = 'flex';
    }
};

let closeFilterOverlay = function () {
    let filterOverlay = document.getElementById('filterOverlay');
    if (filterOverlay) {
        filterOverlay.style.display = 'none';
    }
};

let openContatoOverlay = function (equipeId) {
    const equipe = equipesContatos.find(e => e.id === equipeId);
    const overlay = document.getElementById('contatoOverlay');

    if (!equipe || !overlay) return;

    document.getElementById('contatoTitle').textContent = `CONTATO - ${equipe.nome}`;

    const emailLink = document.querySelector('.contato-link.email-link');
    emailLink.href = `mailto:${equipe.email}`;
    emailLink.querySelector('p').textContent = equipe.email;

    const instagramLink = document.querySelector('.contato-link.instagram-link');
    instagramLink.href = `https://instagram.com/${equipe.instagram.replace('@', '')}`;
    instagramLink.querySelector('p').textContent = equipe.instagram;

    const websiteLink = document.querySelector('.contato-link.website-link');
    websiteLink.href = equipe.website;
    websiteLink.querySelector('p').textContent = equipe.website.replace('https://', '').replace('http://', '');

    overlay.style.display = 'flex';
};

let closecontatoOverlay = function () {
    let contatoOverlay = document.getElementById('contatoOverlay');
    if (contatoOverlay) {
        contatoOverlay.style.display = 'none';
    }
};

let navegarListaEquipes = function () {
    window.location.href = '../../interfaces/html/lista-equipes.html';
}

document.addEventListener("DOMContentLoaded", () => {
    let menuLinks = document.querySelectorAll(".nav-sidebar a");
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (toggleNavStatus) {
                toggleNav();
            }
        });
    });

    let closeFilterButton = document.getElementById('closeOverlay');
    if (closeFilterButton) {
        closeFilterButton.addEventListener('click', closeFilterOverlay);
    }

    let filterButton = document.querySelector('.btn-filtrar');
    if (filterButton) {
        filterButton.addEventListener('click', openFilterOverlay);
    }

    let closecontatoButton = document.getElementById('closecontatoOverlay');
    if (closecontatoButton) {
        closecontatoButton.addEventListener('click', closecontatoOverlay);
    }

    const overlays = document.querySelectorAll('.overlay');

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                if (overlay.id === 'filterOverlay') {
                    closeFilterOverlay();
                } else if (overlay.id === 'contatoOverlay') {
                    closecontatoOverlay();
                }
            }
        });
    });
});

// LOGIN E CADASTRO

const container = document.getElementById('container');
const registerBtn = document.getElementById('btn-register');
const loginBtn = document.getElementById('btn-login');

const register = document.getElementById('register');
const login = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// TESTE

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Usuário ou senha inválidos!');
            return;
        }

        sessionStorage.setItem('token', data.token);
        window.location.href = 'index.html';

    } catch (error) {
        console.error(error);
        alert('Erro ao conectar ao servidor.');
    }
});