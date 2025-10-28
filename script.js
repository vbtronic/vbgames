// Seznam her - každý objekt má název a cestu k HTML souboru
const games = [
    { name: "Space Invaders", path: "games/space-invaders/index.html" }
];

const gameList = document.getElementById('game-list');
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.getElementsByClassName('close')[0];

// Dynamické načtení seznamu her
games.forEach((game, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = game.name;
    button.onclick = () => openGame(game.path);
    li.appendChild(button);
    gameList.appendChild(li);
});

// Klávesové ovládání menu
let selectedIndex = 0;
const buttons = gameList.querySelectorAll('button');
if (buttons.length > 0) {
    buttons[selectedIndex].classList.add('selected');
}

// Message z iframe
window.addEventListener('message', (e) => {
    if (e.data.action === 'closeModal') {
        modal.style.display = 'none';
        gameContainer.src = '';
    }
});

window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        // V modalu - Esc pro zavření
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            gameContainer.src = '';
        }
    } else {
        // V menu - šipky pro navigaci, Enter pro výběr
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            buttons[selectedIndex].classList.remove('selected');
            selectedIndex = (selectedIndex + 1) % buttons.length;
            buttons[selectedIndex].classList.add('selected');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            buttons[selectedIndex].classList.remove('selected');
            selectedIndex = (selectedIndex - 1 + buttons.length) % buttons.length;
            buttons[selectedIndex].classList.add('selected');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            buttons[selectedIndex].click();
        }
    }
});

// Funkce pro otevření hry v modalu
function openGame(path) {
    gameContainer.src = path;
    modal.style.display = 'block';
    // Focus na iframe pro okamžité ovládání
    gameContainer.focus();
}

// Zavření modalu
closeBtn.onclick = function() {
    modal.style.display = 'none';
    gameContainer.src = '';
}

// Kliknutí mimo modal zavře modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        gameContainer.src = '';
    }
}
