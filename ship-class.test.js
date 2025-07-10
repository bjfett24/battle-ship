import { Ship } from './ship-class.js';

const myShip = new Ship(2);

test.skip('hit ship', () => {
    expect(myShip.hit()).toBe(1);
})

test.skip('is it sunk?', () => {
    expect(myShip.isSunk()).toBe(false);
})