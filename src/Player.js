import Gameboard from "./Gameboard.js";
export default class Player {

  #isReal;
  #playersBoard;
  #isWinner;
  
  constructor(isReal=true) {
    this.#isReal = isReal;
    this.#playersBoard = new Gameboard();
    this.#isWinner = false;
  }

  attack(x, y, opponentBoard) {
    const [isValid, isHit, isWon] = opponentBoard.receiveAttack(x, y);
    this.#isWinner = isWon;
    return [isValid, isHit, isWon]
  }

  getBoard() {
    return this.#playersBoard.getBoard();
  }

  getGameboard() {
    return this.#playersBoard;
  }

  isComputer() {
    return this.#isReal;
  }

  isWinner() {
    return this.#isWinner;
  }


}