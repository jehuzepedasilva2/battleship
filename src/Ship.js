export default class Ship {
  
  length;
  #numHits;
  #sunk;
  #coordinates;

  constructor(length) {
    this.length = length;
    this.#numHits = 0;
    this.#sunk = false;
    this.#coordinates = new Set();
  }

  hit() {
    if (!this.#sunk) {
      this.#numHits++;
    }
    this.isSunk()
  }

  isSunk() {
    this.#sunk = this.#numHits === this.length
    return this.#sunk;
  }

  setCoordinates(x, y) {
    this.#coordinates.add(`${x},${y}`);
  }

  getCoordinates() {
    return this.#coordinates;
  }

  hasCoordinates(x, y) {
    return this.#coordinates.has(`${x},${y}`);
  }

}