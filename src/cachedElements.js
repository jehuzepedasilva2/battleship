function getSquare(i, j) {
  return document.querySelector(`.curr .row-${i+1}.col-${j+1}`);
}

function getAllSquares() {
  return document.querySelectorAll('.square');
}

function getCurrBoard() {
  return document.querySelector('.board.curr');
}

function getYourBoardButton() {
  return document.getElementById('your-board');
}

function getOpponentBoardButton() {
  return document.getElementById('opponent-board');
}

function getStartButton() {
  return document.querySelector('.start-btn');
}

function getResetButton() {
  return document.querySelector('.reset-btn');
}

export {
  getSquare,
  getAllSquares,
  getCurrBoard,
  getYourBoardButton,
  getOpponentBoardButton,
  getStartButton,
  getResetButton,
}