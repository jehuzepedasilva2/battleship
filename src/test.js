import Ship from "./Ship.js";
import Gameboard from './Gameboard.js';

describe('Test Ship', () => {
  it('test ship length 5', () => {
    const aircraftCarrier = new Ship(5);
    for (let i = 0; i < 5; i++) {
      expect(aircraftCarrier.isSunk()).toBe(false);
      aircraftCarrier.hit();
    }
    expect(aircraftCarrier.isSunk()).toBe(true);
    aircraftCarrier.hit();
    expect(aircraftCarrier.isSunk()).toBe(true);
  });
  it('test ship length 4', () => {
    const battleship = new Ship(4);
    for (let i = 0; i < 4; i++) {
      expect(battleship.isSunk()).toBe(false);
      battleship.hit();
    }
    expect(battleship.isSunk()).toBe(true);
    battleship.hit();
    expect(battleship.isSunk()).toBe(true);
  });
  it('test ship length 3', () => {
    const cruiserOrSubmarine = new Ship(3);
    for (let i = 0; i < 3; i++) {
      expect(cruiserOrSubmarine.isSunk()).toBe(false);
      cruiserOrSubmarine.hit();
    }
    expect(cruiserOrSubmarine.isSunk()).toBe(true);
    cruiserOrSubmarine.hit();
    expect(cruiserOrSubmarine.isSunk()).toBe(true);
  });
  it('test ship length 2', () => {
    const destroyer = new Ship(2);
    for (let i = 0; i < 2; i++) {
      expect(destroyer.isSunk()).toBe(false);
      destroyer.hit();
    }
    expect(destroyer.isSunk()).toBe(true);
    destroyer.hit();
    expect(destroyer.isSunk()).toBe(true);
  });
});

describe('Test Gameboard', () => {
  const game = new Gameboard();
  let ships = game.getShipsForTests();
  let hits = new Set()
  let misses = new Set();
  it('test receiveAttack() function', () => {
    const last = ships[ships.length-1];
    ships = ships.slice(0, ships.length-1);
    for (const ship of ships) {
      const shipCoordinates = ship.getCoordinates();
      for (const s of shipCoordinates) {
        hits.add(s);
        let t = s.split(',');
        expect(game.receiveAttack(parseInt(t[0]), parseInt(t[1]))[0]).toBe(true);
      }
    }
    const lastCoordinates = Array.from(last.getCoordinates());
    const a = lastCoordinates[0].split(',')
    const b = lastCoordinates[1].split(',')
    hits.add(lastCoordinates[0]);
    hits.add(lastCoordinates[1]);
    expect(game.receiveAttack(parseInt(a[0]),parseInt(a[1]))[0]).toBe(true);
    expect(game.receiveAttack(parseInt(b[0]),parseInt(b[1]))[0]).toBe(true);
  });
  it('test returning misses and hits', () => {
    expect(hits).toEqual(game.getHits());
    expect(misses).toEqual(game.getMisses());
  });
  it('test isAllShipsSunk() function', () => {
    expect(game.isAllShipsSunk()).toBe(true);
  });
})