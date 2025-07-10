import { GameBoard } from './gameboard-class.js';

test.skip('placeships function', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 1], 3, 'h');
    expect(myGameBoard.inspectBoard([3, 1])).toEqual({"hits": 0, "length": 3, "sunk": false});
})

test.skip('placeships function', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 1], 3, 'v');
    expect(myGameBoard.inspectBoard([1, 3])).toEqual({"hits": 0, "length": 3, "sunk": false});
})

test.skip('placeships function', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 8], 3, 'v');
    expect(myGameBoard.inspectBoard([1, 7])).toEqual({"hits": 0, "length": 3, "sunk": false});
})

test('receive attack', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 8], 3, 'v');
    myGameBoard.receiveAttack([1, 7]);
    myGameBoard.receiveAttack([1, 8]);
    myGameBoard.receiveAttack([1, 9]);
    expect(myGameBoard.inspectBoard([1, 8])).toEqual({"hits": 3, "length": 3, "sunk": true});
})

test.skip('receive attack', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 8], 3, 'v');
    myGameBoard.receiveAttack([1, 6]);
    expect(myGameBoard.misses).toEqual([[1, 6]]);
})