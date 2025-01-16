import Player from "./Player.js";
import { 
  renderOpponentsBoard, 
  renderPlayerBoard 
} from "./renderDOM.js";
import { 
  manuallySwitchToPlayerBoard,
  manuallySwitchToOpponentBoard
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
    setTimeout(() => manuallySwitchToOpponentBoard(), 200);
  }
  
  computerTurn() {
    manuallySwitchToPlayerBoard();
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    setTimeout(() => renderPlayerBoard(this.#player), 800);

    // Delay the attack and handle results asynchronously
    this.delayedAttack(x, y).then(({ isValid, isHit, isWon }) => {
      if (isWon) {
        alert('Game Over');
        return;
      }
      if (isValid && isHit) {
        renderPlayerBoard(this.#player);
        setTimeout(() => this.play(), 800);
      } else if (isValid) {
        renderPlayerBoard(this.#player);
        this.#isPlayerOne = true;
        setTimeout(() => this.play(), 800);
      } else {
          this.computerTurn(); // Retry on invalid attack
      }
    });
  }

// Helper method to delay the attack
  delayedAttack(x, y, delay = 500) {
    return new Promise((resolve) => {
      setTimeout(() => {
          const [isValid, isHit, isWon] = this.#computer.attack(x, y, this.#player.getGameboard());
          resolve({ isValid, isHit, isWon });
      }, delay);
    });
  }

  

  handlePlayerOneTurn(square) {
    let x = parseInt(square.classList[1].split('-')[1]) - 1;
    let y = parseInt(square.classList[2].split('-')[1]) - 1;
    let [isValid, isHit, isWon] = this.#player.attack(x, y, this.#computer.getGameboard());
    if (isWon) {
      alert('You Win!')
      return;
    }
    if (isValid && isHit) {
      renderOpponentsBoard(this.#computer);
    } else {
      renderOpponentsBoard(this.#computer);
      this.#isPlayerOne = false;
      setTimeout(() => this.play(), 500);
      // this.play();
    }
  }

  getPlayer() {
    return this.#player;
  }

  getComputer() {
    return this.#computer;
  }

}