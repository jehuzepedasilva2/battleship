import Player from "./Player.js";
import { 
  renderOpponentsBoard, 
  renderPlayerBoard 
} from "./renderDOM.js";
import { 
  manuallySwitchToPlayerBoard,
} from "./handleEvents.js";

export default class Game {

  #computer;
  #player;
  #isPlayerOne;

  constructor() {
    this.#computer = new Player(false); // computer
    this.#player = new Player()
    this.#isPlayerOne = this.#chooseStartPlayer();
  }

  #chooseStartPlayer() {
    if (Math.random() < 0.5) {
      return true;
    }
    return false;
  }

  play() {
    if (this.#isPlayerOne) {
      this.playerTurn();
    } else {
      this.computerTurn();
    }
  }
  
  playerTurn() {
    manuallySwitchToPlayerBoard();
  }
  
  computerTurn() {
    manuallySwitchToPlayerBoard();
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    let [isValid, isHit] = this.#computer.attack(x, y, this.#player.getGameboard());
    if (isValid && isHit) {
      renderPlayerBoard(this.#player);
      setTimeout(() => this.play(), 800);
    } else if (isValid) {
      renderPlayerBoard(this.#player);
      this.#isPlayerOne = true;
      setTimeout(() => this.play(), 800);
    } else {
      this.computerTurn();
    }
  }
  

  handlePlayerOneTurn(square) {
    let x = parseInt(square.classList[1].split('-')[1]) - 1;
    let y = parseInt(square.classList[2].split('-')[1]) - 1;
    let [isValid, isHit] = this.#player.attack(x, y, this.#computer.getGameboard());
    if (isValid && isHit) {
      renderOpponentsBoard(this.#computer);
    } else {
      renderOpponentsBoard(this.#computer);
      this.#isPlayerOne = false;
      setTimeout(() => this.play(), 800);
    }
  }

  getPlayer() {
    return this.#player;
  }

  getComputer() {
    return this.#computer;
  }

}