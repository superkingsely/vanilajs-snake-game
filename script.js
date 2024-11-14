const boardSize = 20;
const board = document.getElementById('game-board');
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
let gameInterval;
let speed = 200; // Adjust this value to control the speed in milliseconds

// Function to draw the board
function drawBoard() {
  board.innerHTML = ''; // Clear the board
  // Draw the snake
  snake.forEach(segment => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y + 1;
    snakeElement.style.gridColumnStart = segment.x + 1;
    snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });
  // Draw the food
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y + 1;
  foodElement.style.gridColumnStart = food.x + 1;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

// Function to update the snake's position
function updateSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
  } else {
    snake.pop(); // Remove the last part of the snake if no food was eaten
  }
}

// Function to check if the game is over
function checkGameOver() {
  const head = snake[0];
  const snakeBody = snake.slice(1);
  // Check if the snake hits the wall
  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    clearInterval(gameInterval);
    alert('Game Over');
    return true;
  }
  // Check if the snake hits itself
  if (snakeBody.some(segment => segment.x === head.x && segment.y === head.y)) {
    clearInterval(gameInterval);
    alert('Game Over');
    return true;
  }
  return false;
}

// Function to handle keyboard input
function handleKeyInput(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

// Game loop
function gameLoop() {
  if (checkGameOver()) return;
  updateSnake();
  drawBoard();
}

// Initialize the game
function startGame() {
  drawBoard();
  document.addEventListener('keydown', handleKeyInput);
  gameInterval = setInterval(gameLoop, speed); // Using the adjustable speed variable here
}

startGame();
