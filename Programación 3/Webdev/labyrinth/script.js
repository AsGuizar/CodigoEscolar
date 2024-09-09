const labyrinth = document.getElementById('labyrinth');
const player = document.getElementById('player');

// Define labyrinth layout with walls (1) and open spaces (0)
const layout = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
];

// Render labyrinth
layout.forEach((row, r) => {
    row.forEach((cell, c) => {
        const div = document.createElement('div');
        div.style.top = `${r * 30}px`;
        div.style.left = `${c * 30}px`;

        if (cell === 1) {
            div.classList.add('wall');
        }

        labyrinth.appendChild(div);
    });
});

const gridSize = 10; // Labyrinth is a 10x10 grid
const cellSize = 30; // Size of each cell in pixels
let playerPosition = { x: 0, y: 0 };
const swipeThreshold = 20; // Minimum distance for swipe to be recognized

// Function to move player
function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        if (layout[newY][newX] === 0) {
            playerPosition = { x: newX, y: newY };
            player.style.top = `${newY * cellSize}px`;
            player.style.left = `${newX * cellSize}px`;
        }
    }
}

// Handle swipe gestures and mouse dragging
let startX = 0;
let startY = 0;

function handleSwipe(dx, dy) {
    if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > swipeThreshold) {
            if (dx > 0) movePlayer(1, 0); // Swipe right
            else movePlayer(-1, 0); // Swipe left
        }
    } else {
        if (Math.abs(dy) > swipeThreshold) {
            if (dy > 0) movePlayer(0, 1); // Swipe down
            else movePlayer(0, -1); // Swipe up
        }
    }
}

// Handle touch events (mobile and touch-enabled devices)
window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    handleSwipe(endX - startX, endY - startY);
});

// Handle mouse events (PC and trackpad)
window.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener('pointerup', (e) => {
    const endX = e.clientX;
    const endY = e.clientY;

    handleSwipe(endX - startX, endY - startY);
});

// Handle keyboard controls on desktop
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});
