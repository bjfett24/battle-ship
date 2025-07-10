import { GameBoard } from './gameboard-class.js';

test('placeships function', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 1], 3, 'h');
    expect(myGameBoard.inspectBoard([3, 1])).toEqual({"hits": 0, "length": 3, "sunk": false});
})

test('placeships function', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 1], 3, 'v');
    expect(myGameBoard.inspectBoard([1, 3])).toEqual({"hits": 0, "length": 3, "sunk": false});
})

test('placeships function', () => {
    const myGameBoard = new GameBoard();
    myGameBoard.placeShip([1, 8], 3, 'v');
    expect(myGameBoard.inspectBoard([1, 7])).toEqual({"hits": 0, "length": 3, "sunk": false});
})