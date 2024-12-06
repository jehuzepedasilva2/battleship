import { 
  getCurrBoard, 
  getOpponentBoardButton, 
  getSquare,
  getAllSquares,
  getAllUserSquares,
  getAllComputerSquares,
  getStartButton, 
  getResetButton,
  getPlayerBoardButton, 
  getOnBoardButton,
} from "./cachedElements.js";
import Game from "./Game.js";
import { renderOpponentsBoard, renderPlayerBoard } from "./renderDOM.js";

const privateVars = {
  game: null,
  player: null,
  computer: null,
  playerGameboard: null,
  computerGameboard: null
}

function setUp() {
  privateVars.game = new Game()
  privateVars.player = privateVars.game.getPlayer();
  privateVars.computer = privateVars.game.getComputer();
  privateVars.playerGameboard = privateVars.player.getGameboard();
  privateVars.computerGameboard = privateVars.computer.getGameboard();
}

function handleComputerSquares() {
  const allSquares = getAllComputerSquares();
  allSquares.forEach(square => {
    square.addEventListener('click', () => {
      let x = parseInt(square.classList[1].split('-')[1])-1;
      let y = parseInt(square.classList[2].split('-')[1])-1;
      isValid = privateVars.player.attack(x, y, privateVars.computerGameboard);
      renderOpponentsBoard(privateVars.computer);
    })
  })
}

function handleStart() {
  const startButton = getStartButton();
  startButton.addEventListener('click', () => {
    setUp();
    handleSwitchToOpponentsBoard();
    handleSwitchToPlayerBoard();
    privateVars.game.play();
    startButton.disabled = true;
  });
}

function handleReset() {
  const resetButton = getResetButton();
  const startButton = getStartButton();
  resetButton.addEventListener('click', () => {
    const allSquare = getAllSquares();
    allSquare.forEach(square => {
      square.style.backgroundColor = '#A0C2CB';
      square.innerHTML = '';
    })
    startButton.disabled = false;
    const onBoard = getOnBoardButton();
    if (onBoard !== null) {
      onBoard.classList.remove('on-board');
    }
    setUp();
  })
}

function handleSwitchToPlayerBoard() {
  const button = getPlayerBoardButton();
  button.addEventListener('click', () => {
    const onBoard = getOnBoardButton();
    onBoard.classList.remove('on-board');
    button.classList.add('on-board');
    renderPlayerBoard(privateVars.player);
  })
}

function manuallySwitchToPlayerBoard() {
  const button = getPlayerBoardButton();
  const onBoard = getOnBoardButton();
  if (onBoard !== null) {
    onBoard.classList.remove('on-board');
  }
  button.classList.add('on-board');
  renderPlayerBoard(privateVars.player);
}

function handleSwitchToOpponentsBoard() {
  const button = getOpponentBoardButton();
  button.addEventListener('click', () => {
    const onBoard = getOnBoardButton();
    console.log(onBoard);
    onBoard.classList.remove('on-board');
    button.classList.add('on-board');
    renderOpponentsBoard(privateVars.computer);
  })
}

function manuallySwitchToOpponentBoard() {
  const button = getOpponentBoardButton();
  const onBoard = getOnBoardButton();
  if (onBoard !== null) {
    onBoard.classList.remove('on-board');
  }
  button.classList.add('on-board');
  renderOpponentsBoard(privateVars.computer);
}

function handleAllEvents() {
  handleReset();
  handleStart();
}

export {
  handleAllEvents,
  handleSwitchToPlayerBoard, 
  handleSwitchToOpponentsBoard, 
  manuallySwitchToOpponentBoard, 
  manuallySwitchToPlayerBoard,
  handleComputerSquares,
}
