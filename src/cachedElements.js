function getSquare(i, j) {
  return document.querySelector(`.curr .row-${i+1}.col-${j+1}`);
}

function getAllSquares() {
  return document.querySelectorAll('.square');
}

function getAllUserSquares() {
  return document.querySelectorAll('.user .square');
}

function getAllComputerSquares() {
  return document.querySelectorAll('.computer .square');
}

function getPlayerBoard() {
  return document.querySelector('.user');
}

function getComputerBoard() {
  return document.querySelector('.computer');
}

function getCurrBoard() {
  return document.querySelector('.board.curr');
}

function getPlayerBoardButton() {
  return document.querySelector('.your-board');
}

function getOpponentBoardButton() {
  return document.querySelector('.opponent-board');
}

function getStartButton() {
  return document.querySelector('.start-btn');
}

function getResetButton() {
  return document.querySelector('.reset-btn');
}

function getOnBoardButton() {
  return document.querySelector('.on-board');
}

export {
  getSquare,
  getAllSquares,
  getAllUserSquares,
  getAllComputerSquares,
  getCurrBoard,
  getPlayerBoardButton,
  getOpponentBoardButton,
  getStartButton,
  getResetButton,
  getPlayerBoard, 
  getComputerBoard,
  getOnBoardButton,
}