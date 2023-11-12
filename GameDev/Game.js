const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Constants for game settings
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const pipeWidth = 50;
const pipeGap = 100;
const pipeSpeed = 2;

// Image paths
const backgroundImagePath = "images/background.png";
const birdImagePath = "images/bird.png";
const pipeImagePath = "images/pipe.png";
const groundImagePath = "images/ground.png";

// Game variables
let birdX = 100;
let birdY = canvasHeight / 2;
let birdVelocity = 0;
const gravity = 0.5;
const jumpStrength = 10;
let pipes = [];
let score = 0;
let isGameOver = false;

// Ground settings
const groundX = 0;
const groundY = canvasHeight - 20;
const groundHeight = 20;

// Cached values
const halfCanvasWidth = canvasWidth / 2;
const halfCanvasHeight = canvasHeight / 2;

const backgroundImage = new Image();
backgroundImage.src = "c:\Users\Angel\OneDrive\Documentos\GitHub\CodigoEscolar-2-\GameDev\background.png";

const birdImage = new Image();
birdImage.src = "images/bird.png";

const pipeImage = new Image();
pipeImage.src = "images/pipe.png";

const groundImage = new Image();
groundImage.src = "images/ground.png";

backgroundImage.onload = function () {
    // Proceed with the game setup or rendering using the background image
};
function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
}

function drawBird() {
    ctx.drawImage(birdImage, birdX, birdY, birdWidth, birdHeight);
}

function drawPipes() {
    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeImage, pipes[i].x, 0, pipeWidth, pipes[i].height);
        ctx.drawImage(pipeImage, pipes[i].x, pipes[i].height + pipeGap, pipeWidth, canvasHeight - pipes[i].height - pipeGap);
    }
}

function drawGround() {
    ctx.drawImage(groundImage, groundX, groundY, canvasWidth, groundHeight);
}

// Function to hide the title screen and start the game
function startGame() {
    const titleScreen = document.getElementById("title-screen");
    const gameCanvas = document.getElementById("gameCanvas");

    // Hide the title screen
    titleScreen.style.display = "none";

    // Display the game canvas
    gameCanvas.style.display = "block";

    // Start the game
    initializeGame();
}

// Event listener for the "Start Game" button click
document.getElementById("start-button").addEventListener("click", startGame);

// Game Initialization
function initializeGame() {
    // Reset game variables
    birdY = canvasHeight / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    isGameOver = false;

    // Create the initial pipe
    generatePipe(canvasWidth, canvasHeight);

    // Set up the game loop
    gameLoop();
}

// Call the game initialization function to start a new game
initializeGame();

// User Input Handling
document.addEventListener("keydown", function (event) {
    if (event.key === " " || event.key === "Spacebar") { // Spacebar key
        event.preventDefault();
        if (!isGameOver) {
            birdJump();
        } else {
            // If the game is over, restart the game on spacebar press
            initializeGame();
        }
    }
});

// Handle bird's jump
function birdJump() {
    birdVelocity = -jumpStrength;
}

// Click/tap handling (for mobile devices)
canvas.addEventListener("click", function () {
    if (!isGameOver) {
        birdJump();
    } else {
        // If the game is over, restart the game on canvas click
        initializeGame();
    }
});

// Update the bird's bounding box
const birdWidth = 40;
const birdHeight = 40;

function checkCollisions() {
    const birdBoundingBox = {
        x: birdX,
        y: birdY,
        width: birdWidth,
        height: birdHeight,
    };

    // Bird and Ground Collision
    if (birdBoundingBox.y + birdBoundingBox.height >= groundY) {
        isGameOver = true;
    }

    // Bird and Pipe Collision
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        const pipeBoundingBox = {
            x: pipe.x,
            y: 0,
            width: pipeWidth,
            height: pipe.height,
        };

        const topPipeBoundingBox = {
            x: pipe.x,
            y: pipe.height + pipeGap,
            width: pipeWidth,
            height: canvasHeight - pipe.height - pipeGap,
        };

        if (
            birdBoundingBox.x < pipeBoundingBox.x + pipeBoundingBox.width &&
            birdBoundingBox.x + birdBoundingBox.width > pipeBoundingBox.x &&
            birdBoundingBox.y < pipeBoundingBox.y + pipeBoundingBox.height
        ) {
            isGameOver = true;
        }

        if (
            birdBoundingBox.x < topPipeBoundingBox.x + topPipeBoundingBox.width &&
            birdBoundingBox.x + birdBoundingBox.width > topPipeBoundingBox.x &&
            birdBoundingBox.y + birdBoundingBox.height > topPipeBoundingBox.y
        ) {
            isGameOver = true;
        }
    }
}

// Update the collision check
function updatePipes() {
    // Update the position of pipes and check for successful passes
    for (let i = 0; i < pipes.length; i++) {
        // Move the pipe to the left
        pipes[i].x -= pipeSpeed;

        // Check if the bird has successfully passed through a pipe
        if (pipes[i].x + pipeWidth < birdX) {
            // Increment the score and remove the passed pipe
            score++;
            pipes.splice(i, 1);
            i--; // Adjust the loop counter
        }
    }
}

// Draw the game elements on the canvas
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Update and render game elements
    drawBackground();
    updatePipes();
    drawPipes();
    drawBird();
    drawGround();
    updateScore();

    if (isGameOver) {
        // Display game over screen
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", halfCanvasWidth - 75, halfCanvasHeight - 15);
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, halfCanvasWidth - 30, halfCanvasHeight + 20);
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    draw();
    if (!isGameOver) {
        birdY += birdVelocity;
        birdVelocity += gravity;
        checkCollisions();
    }
}

// Generate a new pipe and add it to the pipes array
function generatePipe() {
    const pipeHeight = Math.floor(Math.random() * (canvasHeight - pipeGap - 100)) + 50;
    const newPipe = { x: canvasWidth, height: pipeHeight };
    pipes.push(newPipe);
}

let frameCount = 0; // Keeps track of frames
const pipeSpawnInterval = 100; // Controls how often new pipes are generated

function updatePipes() {
    for (let i = 0; i < pipes.length; i++) {
        // Move existing pipes to the left
        pipes[i].x -= pipeSpeed;

        // Check if a pipe is off the screen and remove it
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            i--; // Adjust the loop counter
        }
    }

    // Generate new pipes at regular intervals
    if (frameCount % pipeSpawnInterval === 0) {
        generatePipe();
    }

    frameCount++;
}

// Define the restartGame function to reset the game
function restartGame() {
    initializeGame();
}

// Call the restartGame function to start the initial game
restartGame();
