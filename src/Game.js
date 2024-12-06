import Player from "./Player.js";
import { getAllComputerSquares } from "./cachedElements.js";
import { renderOpponentsBoard, renderPlayerBoard } from "./renderDOM.js";
import { 
  handleComputerSquares,
  manuallySwitchToOpponentBoard, 
  manuallySwitchToPlayerBoard,
} from "./HandleEvents.js";

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

  // wrong
  play() {
    if (this.#isPlayerOne) {
      manuallySwitchToOpponentBoard();
      const allSquares = getAllComputerSquares();
      allSquares.forEach(square => {
        square.addEventListener('click', () => {
          let x = parseInt(square.classList[1].split('-')[1]) - 1;
          let y = parseInt(square.classList[2].split('-')[1]) - 1;
          let isValid = this.#player.attack(x, y, this.#computer.getGameboard());
          if (isValid) {
            renderOpponentsBoard(this.#computer);
            this.#isPlayerOne = false;
            setTimeout(() => {
              this.play(); // Delay the play call by 1000ms
            }, 800);
          } else {
            this.play();
          }
        });
      });
    } else {
      manuallySwitchToPlayerBoard();
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      let isValid = this.#computer.attack(x, y, this.#player.getGameboard());
      if (isValid) {
        setTimeout(() => {
          renderPlayerBoard(this.#player); // Delay the play call by 1000ms
        }, 800);
        this.#isPlayerOne = true
        this.play();
      } else {
        this.play();
      }
    }    
  }

  getPlayer() {
    return this.#player;
  }

  getComputer() {
    return this.#computer;
  }

}