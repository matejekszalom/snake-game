import { onSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let bomb = getRandomBombPosition()
let changePositionTime =  Date.now()


export function update() {
  if (onSnake(bomb)) {
    bomb = window.localStorage.setItem("onBomb", true);
    changePositionTime = Date.now()
  } else if (Date.now() - changePositionTime >= 30000) {
    bomb = getRandomBombPosition()
    changePositionTime = Date.now()
  }
}

export function draw(gameBoard) {
  const bombElement = document.createElement('div')
  bombElement.style.gridRowStart = bomb.y
  bombElement.style.gridColumnStart = bomb.x
  bombElement.classList.add('bomb')
  gameBoard.appendChild(bombElement)
}


function getRandomBombPosition() {
  let newBombPosition
  while (newBombPosition == null || onSnake(newBombPosition)) {
    newBombPosition = randomGridPosition()
  }
  return newBombPosition
}