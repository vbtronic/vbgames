let score = 0;
const scoreElement = document.getElementById('score');
const button = document.getElementById('click-btn');

button.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
});
