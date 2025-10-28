const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Herní stav
let gameState = 'intro';
let gameRunning = true;
let introStartTime = 0;
let playerPosition = 0;
let aiCars = [];
let oncomingCars = [];
let slowCars = [];
let playerCar = null;
let cameraY = 0;
let keys = {};

// Nastavení velikosti canvas
const BASE_WIDTH = 600;
const BASE_HEIGHT = 400;
canvas.width = BASE_WIDTH;
canvas.height = BASE_HEIGHT;

// Škálování pro responzivnost
const containerWidth = canvas.offsetWidth;
const containerHeight = canvas.offsetHeight;
const scaleX = containerWidth / BASE_WIDTH;
const scaleY = containerHeight / BASE_HEIGHT;
const scale = Math.min(scaleX, scaleY);
canvas.style.width = `${BASE_WIDTH * scale}px`;
canvas.style.height = `${BASE_HEIGHT * scale}px`;

// Barvy
const ROAD_COLOR = '#666';
const LINE_COLOR = '#fff';
const GRASS_COLOR = '#0f0';

// Třídy
class Car {
    constructor(x, y, color, isPlayer = false, name = '', type = 'player') {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 20;
        this.color = color;
        this.speed = 0;
        this.maxSpeed = type === 'slow' ? 2 : 5;
        this.acceleration = 0.1;
        this.deceleration = 0.05;
        this.lane = 0; // 0 nebo 1
        this.isPlayer = isPlayer;
        this.name = name;
        this.progress = 0;
        this.type = type; // 'player', 'ai', 'slow', 'oncoming'
    }

    update() {
        if (this.isPlayer) {
            if (keys.ArrowUp) {
                this.speed = Math.min(this.maxSpeed, this.speed + this.acceleration);
            } else if (keys.ArrowDown) {
                this.speed = Math.max(-2, this.speed - this.acceleration);
            } else {
                if (this.speed > 0) {
                    this.speed -= this.deceleration;
                } else if (this.speed < 0) {
                    this.speed += this.deceleration;
                }
            }
            if (keys.ArrowLeft && this.lane > 0) {
                this.lane--;
                this.x -= 50;
            }
            if (keys.ArrowRight && this.lane < 1) {
                this.lane++;
                this.x += 50;
            }
        } else {
            // AI logika
            if (this.type === 'ai') {
                this.speed = Math.random() * 3 + 3;
            } else if (this.type === 'slow') {
                this.speed = Math.random() * 1 + 1;
            } else if (this.type === 'oncoming') {
                this.speed = Math.random() * 4 + 2;
            }
        }
        this.y -= this.speed;
        this.progress += this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        if (this.name) {
            ctx.fillStyle = '#fff';
            ctx.font = '12px Arial';
            ctx.fillText(this.name, this.x - this.width/2, this.y - this.height/2 - 5);
        }
    }
}

// Funkce pro generování jmen
const americanNames = ['John', 'Mike', 'Steve', 'Bob', 'Tom', 'Dave', 'Jim', 'Bill', 'Jack', 'Paul'];

// Inicializace
function init() {
    introStartTime = Date.now();
    playerCar = new Car(BASE_WIDTH/2, BASE_HEIGHT - 50, '#f00', true);
}

// Herní smyčka
function gameLoop() {
    update();
    draw();
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Update
function update() {
    if (gameState === 'intro') {
        if (Date.now() - introStartTime > 10000 || keys[' ']) { // 10 sekund nebo mezerník
            gameState = 'playing';
            initGame();
        }
    } else if (gameState === 'playing') {
        playerCar.update();
        cameraY = playerCar.y - BASE_HEIGHT / 2; // Camera follow
        aiCars.forEach(car => car.update());
        oncomingCars.forEach(car => {
            car.update();
            if (checkCollision(playerCar, car)) {
                gameState = 'game_over';
            }
        });
        slowCars.forEach(car => car.update());
        // Generování nových aut
        if (Math.random() < 0.01) {
            oncomingCars.push(new Car(BASE_WIDTH/2 + (Math.random() - 0.5) * 200, cameraY + BASE_HEIGHT + 50, '#00f', false, '', 'oncoming'));
        }
        if (Math.random() < 0.005) {
            slowCars.push(new Car(BASE_WIDTH/2 + (Math.random() - 0.5) * 100, cameraY + BASE_HEIGHT + 50, '#ff0', false, '', 'slow'));
        }
        // Odstranění aut mimo obrazovku
        oncomingCars = oncomingCars.filter(car => car.y < cameraY - 100);
        slowCars = slowCars.filter(car => car.y < cameraY - 100);
        aiCars = aiCars.filter(car => car.y < cameraY - 100);
        // Kontrola předjíždění
        playerPosition = 1;
        aiCars.forEach(car => {
            if (playerCar.progress < car.progress) {
                playerPosition++;
            }
        });
    }
}

// Draw
function draw() {
    ctx.clearRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
    if (gameState === 'intro') {
        drawIntro();
    } else if (gameState === 'playing') {
        ctx.save();
        ctx.translate(0, -cameraY);
        drawRoad();
        playerCar.draw();
        aiCars.forEach(car => car.draw());
        oncomingCars.forEach(car => car.draw());
        slowCars.forEach(car => car.draw());
        ctx.restore();
        drawUI();
    } else if (gameState === 'game_over') {
        drawGameOver();
    }
}

function drawIntro() {
    let time = (Date.now() - introStartTime) / 1000; // sekundy
    drawRoad();
    // Animace aut
    let demoPlayer = new Car(BASE_WIDTH/2 - 50, BASE_HEIGHT/2 + Math.sin(time * 2) * 50, '#f00', false, 'Player', 'player');
    demoPlayer.draw();
    let demoAI = new Car(BASE_WIDTH/2 + 50, BASE_HEIGHT/2 + Math.sin(time * 2 + 1) * 50, '#0f0', false, 'AI', 'ai');
    demoAI.draw();
    let demoSlow = new Car(BASE_WIDTH/2, BASE_HEIGHT/2 + 100 + Math.sin(time * 1.5) * 20, '#ff0', false, '', 'slow');
    demoSlow.draw();
    let demoOncoming = new Car(BASE_WIDTH/2, BASE_HEIGHT/2 - 100 - Math.sin(time * 1.5) * 20, '#00f', false, '', 'oncoming');
    demoOncoming.draw();
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('Ukázka - Mezerník pro start', BASE_WIDTH/2 - 100, BASE_HEIGHT - 50);
}


function drawRoad() {
    // Tráva
    ctx.fillStyle = GRASS_COLOR;
    ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
    // Silnice
    ctx.fillStyle = ROAD_COLOR;
    ctx.fillRect(BASE_WIDTH/2 - 100, 0, 200, BASE_HEIGHT);
    // Čáry - animované
    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 5;
    ctx.setLineDash([20, 20]);
    ctx.lineDashOffset = -cameraY * 0.1;
    ctx.beginPath();
    ctx.moveTo(BASE_WIDTH/2, 0);
    ctx.lineTo(BASE_WIDTH/2, BASE_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawUI() {
    ctx.fillStyle = '#fff';
    ctx.font = '16px Arial';
    ctx.fillText('Pozice: ' + playerPosition + '/10', BASE_WIDTH - 100, 30);
    ctx.fillText('Rychlost: ' + playerCar.speed.toFixed(1), BASE_WIDTH - 100, 50);
}

function drawGameOver() {
    ctx.fillStyle = '#f00';
    ctx.font = '36px Arial';
    ctx.fillText('Game Over', BASE_WIDTH/2 - 100, BASE_HEIGHT/2);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Stiskni R pro restart', BASE_WIDTH/2 - 100, BASE_HEIGHT/2 + 50);
}

function initGame() {
    playerCar = new Car(BASE_WIDTH/2, BASE_HEIGHT / 2, '#f00', true, 'Player', 'player');
    aiCars = [];
    for (let i = 0; i < 9; i++) {
        aiCars.push(new Car(BASE_WIDTH/2 + (Math.random() - 0.5) * 100, BASE_HEIGHT / 2 - 100 - i * 100, '#0f0', false, americanNames[i], 'ai'));
    }
    oncomingCars = [];
    slowCars = [];
    cameraY = 0;
}

function checkCollision(car1, car2) {
    return car1.x < car2.x + car2.width &&
           car1.x + car1.width > car2.x &&
           car1.y < car2.y + car2.height &&
           car1.y + car1.height > car2.y;
}

// Event listeners
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === 'r' && gameState === 'game_over') {
        gameState = 'intro';
        introStartTime = Date.now();
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Spuštění
init();
gameLoop();
