import { onSnake } from './snake.js'


let score = 0;
export const SCORE_RATE = 1;


export function update(food) {
    if (onSnake(food)) {
        expandScore(SCORE_RATE);
    }
    return score;
}

export function draw(body) {
    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score');
    scoreElement.innerHTML = 'Score: ' + score;
    body.appendChild(scoreElement);

    const globalScoreElement = document.createElement('div');
    globalScoreElement.classList.add('global-score');
    let globalScore = window.localStorage.getItem("globalScore") ?? 0;
    globalScoreElement.innerHTML = 'Global score: ' + globalScore;
    body.appendChild(globalScoreElement);
}


 export function expandScore(amount) {
    score += amount;
}