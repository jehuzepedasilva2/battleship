import { 
  getCurrBoard, 
  getOpponentBoardButton, 
  getSquare,
  getAllSquares,
  getStartButton, 
  getResetButton, 
} from "./cachedElements.js";
import play from "./Game.js";

function handleStart() {
  const startButton = getStartButton();
  startButton.addEventListener('click', () => {
    play();
  })
}

function handleReset() {
  const resetButton = getResetButton();
  resetButton.addEventListener('click', () => {
    const allSquare = getAllSquares();
    allSquare.forEach(square => {
      square.innerHTML = '';
    })
  })
}

function handleYourBoardButton() {
  
}

export {
  handleReset,
  handleStart,
}