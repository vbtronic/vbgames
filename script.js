// Seznam her - každý objekt má název a cestu k HTML souboru
const games = [
    { name: "Příklad hry", path: "games/example/index.html" }
];

const gameList = document.getElementById('game-list');
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.getElementsByClassName('close')[0];

// Dynamické načtení seznamu her
games.forEach(game => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = game.name;
    button.onclick = () => openGame(game.path);
    li.appendChild(button);
    gameList.appendChild(li);
});

// Funkce pro otevření hry v modalu
function openGame(path) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            gameContainer.innerHTML = html;
            modal.style.display = 'block';
        })
        .catch(error => {
            console.error('Chyba při načítání hry:', error);
            gameContainer.innerHTML = '<p>Chyba při načítání hry.</p>';
            modal.style.display = 'block';
        });
}

// Zavření modalu
closeBtn.onclick = function() {
    modal.style.display = 'none';
    gameContainer.innerHTML = '';
}

// Kliknutí mimo modal zavře modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        gameContainer.innerHTML = '';
    }
}
