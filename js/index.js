import { Apple } from './apple.js';
import { getBestResFromLocalStorage } from './getDataFromLocalStorage.js';
import options from './options.js';
import { Snake } from './snake.js';

let game = document.getElementById('game__canvas');
let root = game.getContext('2d');
let score = options.game.score;
let bestRes = options.game.best;
let snake;
let apple;

function main() {
  let scoreDocument = document.getElementById('score');
  let scoreBestEl = document.getElementById('best');
  scoreDocument.innerHTML = score;
  scoreBestEl.innerHTML = bestRes;

  function gameOver() {
    saveRecord(score);
    clearInterval(interval);
    const playAgain = confirm('You lost. Do you want to try again ?');
    if (playAgain) {
      init();
      main();
    }
  }

  function saveRecord(num) {
    if (num > bestRes) {
      localStorage.setItem('best', num);
      bestRes = num;
      scoreBestEl = num;
    }
  }

  function collision() {
    const snakePos = snake.position;
    const applePos = apple.position;

    if (snakePos.x === applePos.x && snakePos.y === applePos.y) {
      apple.newPosition(options.game.grip);
      snake.startCells = snake.startCells + 1;
      scoreDocument.innerHTML = ++score;
    }

    if (snake.isСrossTailWithHead() || snake.collisionWalls(game)) {
      gameOver();
    }
  }

  function createRect(x, y, width, height) {
    root.rect(x, y, width, height);
  }

  function draw() {
    root.clearRect(0, 0, game.width, game.height);
    apple.draw(root);
    snake.draw(root, createRect);
  }

  function update() {
    draw();
    collision();
    snake.move();
    snake.x = snake.position.x + snake.velocity.dx;
    snake.y = snake.position.y + snake.velocity.dy;
  }

  snake.move();
  let interval = setInterval(update, 1000 / options.game.speed);
}

function init() {
  snake = new Snake(
    options.snake.x,
    options.snake.y,
    options.snake.dx,
    options.snake.dy,
    options.snake.startCells,
    options.snake.size,
    options.snake.color
  );
  apple = new Apple(options.apple.x, options.apple.y, options.apple.size, options.apple.color);
  score = options.game.score;
  bestRes = getBestResFromLocalStorage();
}

init();
main();
