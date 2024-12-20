import Ship from './Ship.js';
export default class Gameboard {

  #rows;
  #cols;
  #board;
  #ships;
  #numShips;
  #hits;
  #misses;

  constructor(rows=10, cols=10) {
    this.#rows = rows;
    this.#cols = cols;
    this.#board = this.#initializeBoard(this.#rows, this.#cols);
    this.#ships = [];
    this.#numShips = 5;
    this.#hits = new Set();
    this.#misses = new Set();
    this.#initializeShips();
  }

  #initializeShips() {
    for (const s of [5, 4, 3, 3, 2]) {
      this.#ships.push(new Ship(s));
    }
    this.#placeShipsRandomly();
  }

  #isValid(x, y) {
    return x >= 0 && y >= 0 && x < this.#rows && y < this.#cols;
  }
  
  #isValidPlacement(x, y, length, isHorizontal) {
    if (isHorizontal) {
      if (y + length > this.#cols) return false;
    } else {
      if (x + length > this.#rows) return false;
    }
    
    if (isHorizontal) {
      for (let i = x - 1; i <= x + 1; i++) { 
        for (let j = y - 1; j <= y + length; j++) { 
          if (this.#isValid(i, j) && this.#board[i][j] === 1) {
            return false; 
          }
        }
      }
    } else {
      for (let i = x - 1; i <= x + length; i++) {
        for (let j = y - 1; j <= y + 1; j++) { 
          if (this.#isValid(i, j) && this.#board[i][j] === 1) {
            return false;
          }
        }
      }
    }
  
    return true;
  }
  
  
  #placeShip(x, y, length, isHorizontal, ship) {
    if (isHorizontal) {
      for (let i = y; i < y + length; i++) {
        this.#board[x][i] = 1;
        this.#ships[ship].setCoordinates(x, i);
      }
    } else {
      for (let i = x; i < x + length; i++) {
        this.#board[i][y] = 1;
        this.#ships[ship].setCoordinates(i, y);
      }
    }
  }

  #placeShipsRandomly(ship=0) {
    if (ship >= this.#ships.length) {
      return;
    }
    const shipLength = this.#ships[ship].length
    const x = Math.floor(Math.random() * 10); // start x
    const y = Math.floor(Math.random() * 10); // start y
    const isHorizontal = Math.random() < 0.5; // horizontal or vertical placing
    if (this.#isValidPlacement(x, y, shipLength, isHorizontal)) {
      this.#placeShip(x, y, shipLength, isHorizontal, ship);
      this.#placeShipsRandomly(ship+1)
    } else {
      this.#placeShipsRandomly(ship);
    }
  }

  #initializeBoard(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  print() {
    for (let i = 0; i < this.#rows; i++) {
      console.log(this.#board[i]);
    }
  }

  isAllShipsSunk() {
    return this.#gameWon();
  }

  #gameWon() {
    return this.#numShips <= 0;
  }

  receiveAttack(x, y) {
    if (this.#board[x][y] === -1 || this.#hits.has(`${x},${y}`) || this.#misses.has(`${x},${y}`) || !this.#isValid(x, y) || this.#board[x][y] === -2) {
      return [false, false, this.#gameWon()];
    }
    for (const ship of this.#ships) {
      if (ship.hasCoordinates(x, y)) {
        ship.hit();
        this.#board[x][y] = -2;
        this.#hits.add(`${x},${y}`);
        if (ship.isSunk()) {
          this.#numShips--;
        }
        return [true, true, this.#gameWon()];
      }
    }
    this.#misses.add(`${x},${y}`);
    this.#board[x][y] = -1;
    return [true, false, this.#gameWon()];
  }

  getHits() {
    return this.#hits;
  }

  getMisses() {
    return this.#misses;
  }

  getShips() {
    return this.#ships
  }

  getBoard() {
    return this.#board;
  }
}