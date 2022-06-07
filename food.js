import { onSnake, expandSnake} from './snake.js'
import { randomGridPosition } from './grid.js'
import { expandScore, SCORE_RATE } from './score.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 1
let time =  Date.now()


export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    expandScore(SCORE_RATE)
    food = getRandomFoodPosition()
    time = Date.now()
  } else if (Date.now() - time >= 10000) {
    food = getRandomFoodPosition()
    time = Date.now()
  }
  return food
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}