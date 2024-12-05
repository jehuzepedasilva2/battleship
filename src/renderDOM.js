import { getSquare } from "./cachedElements.js";

function display(i, j, status) {
  const square = getSquare(i, j);
  if (status === 'miss') {
    square.style.backgroundColor = 'lightyellow';
  }
  square.innerHTML = `<div class="circle ${status}"></div>`;
}

function renderOpponentsBoard() {
  
}

function renderYourBoard(player) {
  const playerBoard = player.getBoard();
  for (let i = 0; i < playerBoard.length; i++) {
    for (let j = 0; j < playerBoard[i].length; j++) {
      if (playerBoard[i][j] === 1) {
        display(i, j, 'ok');
      } else if (playerBoard[i][j] === -2) {
        display(i, j, 'hit');
      } else if (playerBoard[i][j] === -1) {
        display(i, j, 'miss');
      }
    }
  }
  
}

export { 
  renderBoard,
}