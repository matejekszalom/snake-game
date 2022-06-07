import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { update as updateBomb, draw as drawBomb } from './bomb.js'
import { update as updateScore, draw as drawScore} from './score.js'

let lastRenderTime = 0
let gameOver = false
let startTime =  Date.now()
const drawingBomb = 30000
const gameBoard = document.getElementById('game-board')
const score = document.getElementById('score')

function main(currentTime) {
  if (gameOver) {
    if (confirm('Your game is over. If you want to try again press ok.')) {
      window.localStorage.removeItem("onBomb");
      window.location = '/';
    }
    return
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main);

function update() {
  updateSnake()
  let foodPosition = updateFood()
  updateBomb()
  let score = updateScore(foodPosition)
  checkDeath(score)
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
  if (Date.now() - startTime >= drawingBomb) {
    drawBomb(gameBoard)
  }
  score.innerHTML =''
  drawScore(score)
}

export function checkDeath(score) {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || window.localStorage.getItem("onBomb");
  
  if (gameOver) {
    let globalScore = window.localStorage.getItem("globalScore") ?? 0;
    window.localStorage.setItem("globalScore", (parseInt(globalScore) + score).toString());
  }
}