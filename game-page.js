import { Driver } from "./driver.js";

function populateGame() {
    const driver = new Driver();
    const oldContainer = document.querySelector('.main-container');
    oldContainer.remove();

    const container = document.createElement('div');
    container.classList.add('game', 'main-container');
    document.body.appendChild(container);

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = 'Battle Ships';
    container.appendChild(title);

    const buttonBox = document.createElement('div');
    buttonBox.classList.add('button-box');
    container.appendChild(buttonBox);

    const setShips = document.createElement('button');
    setShips.classList.add('set-ships');
    setShips.textContent = 'Place Ships';
    setShips.addEventListener('click', () => {
        driver.setShips();
    });
    buttonBox.appendChild(setShips);

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board', 'container');
    container.appendChild(boardContainer);

    const myBoard = document.createElement('div');
    myBoard.classList.add('my-board');
    // myBoard.textContent = 'empty text';
    boardContainer.appendChild(myBoard);

    const comBoard = document.createElement('div');
    comBoard.classList.add('com-board');
    // comBoard.textContent = 'empty text';
    boardContainer.appendChild(comBoard);

    fillBoards([myBoard, comBoard]);

    const comSquares = document.querySelectorAll('.com-board .square');
    for (let square of comSquares) {
        square.addEventListener('click', function() {
            driver.playTurn(this);
        });
    }



}

function fillBoards(boards) {
    for (let board of boards) {
        for (let row = 9; row > -1; row--) {
            const rowBox = document.createElement('div');
            rowBox.classList.add('row', `r${row}`);
            board.appendChild(rowBox);
            for (let col = 0; col < 10; col++) {
                const square = document.createElement('div');
                square.classList.add('square', `sq${col}-${row}`);
                square.type = 'button';
                rowBox.appendChild(square);
            }
        }
    }
}

function showHit(square) {
    square.classList.add('hit');
}

function showMiss(square) {
    square.classList.add('miss');
}


export { populateGame, showHit, showMiss };