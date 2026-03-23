const apps = [
    { name: 'Space Invaders', path: 'games/space-invaders/index.html' },
    { name: 'Vesmírná mise', path: 'games/vesmirna-mise/index.html' },
    { name: 'Racing Game', path: 'games/racing-game/index.html' },
    { name: 'City Forge', path: 'games/city-forge/index.html' }
];

const appList = document.getElementById('app-list');
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.querySelector('.close');

apps.forEach((app) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = app.name;
    button.addEventListener('click', () => {
        openApp(app.path);
    });
    li.appendChild(button);
    appList.appendChild(li);
});

let selectedIndex = 0;
const buttons = appList.querySelectorAll('button');
if (buttons.length > 0) {
    buttons[selectedIndex].classList.add('selected');
}

window.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'closeModal') {
        closeModal();
    }
});

window.addEventListener('keydown', (event) => {
    if (modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        }
        return;
    }

    if (!buttons.length) {
        return;
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        buttons[selectedIndex].classList.remove('selected');
        selectedIndex = (selectedIndex + 1) % buttons.length;
        buttons[selectedIndex].classList.add('selected');
    }

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        buttons[selectedIndex].classList.remove('selected');
        selectedIndex = (selectedIndex - 1 + buttons.length) % buttons.length;
        buttons[selectedIndex].classList.add('selected');
    }

    if (event.key === 'Enter') {
        event.preventDefault();
        buttons[selectedIndex].click();
    }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

function openApp(path) {
    gameContainer.src = path;
    modal.style.display = 'block';
    gameContainer.focus();
}

function closeModal() {
    modal.style.display = 'none';
    gameContainer.src = '';
}
