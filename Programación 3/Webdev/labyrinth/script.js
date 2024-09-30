// HTML elements
const labyrinth = document.getElementById('labyrinth');
const player = document.getElementById('player');

// Define labyrinth layout with walls (1), open spaces (0), start (S), and finish (F)
const layout = [
    [1, 'S', 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 'F', 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 0, 1],
];

// Initial player position at 'S'
let playerPosition = { x: 1, y: 0 };
const gridSize = 10;
const cellSize = 50;

// sound files
const movementSound = new Audio('./sounds/movement.mp3');
const collisionSound = new Audio('./sounds/collision.mp3');
const finishSound = new Audio('./sounds/finish.mp3');

// Function to render the labyrinth layout
function renderLabyrinth() {
    layout.forEach((row, r) => {
        row.forEach((cell, c) => {
            const div = document.createElement('div');
            div.style.top = `${r * cellSize}px`;
            div.style.left = `${c * cellSize}px`;

            if (cell === 1) {
                div.classList.add('wall');
            } else if (cell === 'S') {
                div.classList.add('start');
            } else if (cell === 'F') {
                div.classList.add('finish');
            }

            labyrinth.appendChild(div);
        });
    });
}

// Function to reset the player to the starting position
function resetGame() {
    playerPosition = { x: 1, y: 0 }; // Reset player to start position
    player.style.top = `${playerPosition.y * cellSize}px`;
    player.style.left = `${playerPosition.x * cellSize}px`;
}

// Function to move player
function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        const targetCell = layout[newY][newX];

        if (targetCell === 0 || targetCell === 'F') {
            // Valid move
            playerPosition = { x: newX, y: newY };
            player.style.top = `${newY * cellSize}px`;
            player.style.left = `${newX * cellSize}px`;

            movementSound.play(); // Play movement sound

            if (targetCell === 'F') {
                finishSound.play(); // Play finish sound
                setTimeout(() => {
                    const restart = confirm("You reached the finish! Do you want to play again?");
                    if (restart) {
                        resetGame(); // Restart the game if player confirms
                    }
                }, 100); // Small delay to allow player to reach finish visually
            }
        } else {
            // Collision with a wall
            collisionSound.play(); // Play collision sound
        }
    } else {
        // Out of bounds (also treated as collision)
        collisionSound.play(); // Play collision sound
    }
}

// Remaining unchanged code
layout.forEach((row, r) => {
    row.forEach((cell, c) => {
        const div = document.createElement('div');
        div.style.top = `${r * cellSize}px`;
        div.style.left = `${c * cellSize}px`;

        if (cell === 1) {
            div.classList.add('wall');
        } else if (cell === 'S') {
            div.classList.add('start');
        } else if (cell === 'F') {
            div.classList.add('finish');
        }

        labyrinth.appendChild(div);
    });
});

// Swipe threshold to detect swipe length
const swipeThreshold = 30; // Pixels for valid swipe

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

// Handle touch events
window.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    handleSwipe(endX - startX, endY - startY);
});

// Handle mouse events
window.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener('pointerup', (e) => {
    const endX = e.clientX;
    const endY = e.clientY;

    handleSwipe(endX - startX, endY - startY);
});

// Handle keyboard controls
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

renderLabyrinth();
resetGame();
