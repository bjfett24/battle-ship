import { Driver } from "./driver.js";
import { chooseDirDialog } from "./dialog.js";

function populateGame() {
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

    // const resetShips = document.createElement('button');
    // resetShips.classList.add('set-ships');
    // resetShips.textContent = 'Play Game';
    // resetShips.addEventListener('click', () => {
    //     driver.setShips();
    // });
    // buttonBox.appendChild(resetShips);

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board', 'container');
    container.appendChild(boardContainer);

    const shipDock = document.createElement('div');
    shipDock.classList.add('ship-dock');
    boardContainer.appendChild(shipDock);



    




    const myBoard = document.createElement('div');
    myBoard.classList.add('my-board');
    // myBoard.textContent = 'empty text';
    boardContainer.appendChild(myBoard);

    const comBoard = document.createElement('div');
    comBoard.classList.add('com-board');
    // comBoard.textContent = 'empty text';
    boardContainer.appendChild(comBoard);



    fillBoards([myBoard, comBoard]);

    const driver = new Driver();

    const twoContainer = document.createElement('div');
    twoContainer.classList.add('ship-container', 'two2');
    shipDock.appendChild(twoContainer);

    const threeContainer = document.createElement('div');
    threeContainer.classList.add('ship-container', 'three3');
    shipDock.appendChild(threeContainer);

    const fourContainer = document.createElement('div');
    fourContainer.classList.add('ship-container', 'four4');
    shipDock.appendChild(fourContainer);

    const fiveContainer = document.createElement('div');
    fiveContainer.classList.add('ship-container', 'five5');
    shipDock.appendChild(fiveContainer);

    const shipConts = [twoContainer, threeContainer, fourContainer, fiveContainer];

    for (let cont of shipConts) {
        const contClass = cont.classList[1];
        const shipNum = +contClass.slice(contClass.length - 1, contClass.length);       
        
        const mockShip = document.createElement('div');
        mockShip.classList.add('mock-ship', `ship-${shipNum}`);
        mockShip.type = 'button'
        mockShip.addEventListener('click', function () {
            selectShip(this, driver);
        })
        cont.appendChild(mockShip);

        for (let i = 0; i < shipNum; i++) {
            const shipPiece = document.createElement('div');
            shipPiece.classList.add('ship-piece');
            mockShip.appendChild(shipPiece);
        }
    }

    const comSquares = document.querySelectorAll('.com-board .square');
    for (let square of comSquares) {
        square.addEventListener('click', function() {squareClick(driver, this)});
    }

}

function selectShip(ship, driver) {
    const pointer = 'dummy';
    const shipClass = ship.classList[1];
    const shipLength = +shipClass.slice(shipClass.length - 1, shipClass.length);
   
    const previouslySelected = document.querySelector('.selected-ship');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected-ship');
    }
    ship.classList.add('selected-ship');


    const realSquares = document.querySelectorAll('.my-board .square');
    const lastShip = driver.getPlacingProcess();
    if (lastShip['start'] === true) {
        for (let square of realSquares) {
            square.classList.remove('done-disabled');
            // const squareClass = square.classList[1];
            // const squareCoord = [+squareClass.slice(2, 3), +squareClass.slice(4, 5)];
            const oldBoundFunc = driver.getBoundFuncRef(square);
            square.removeEventListener('click', oldBoundFunc);
        }
    }




    for (let square of realSquares) {
        const squareClass = square.classList[1];
        const squareCoord = [+squareClass.slice(2, 3), +squareClass.slice(4, 5)];
        const newBoundFunc = handleSquareClickForShipPlacement.bind(pointer, ship, driver, shipLength, squareCoord);
        driver.setBoundFuncRef(square, newBoundFunc);
        square.addEventListener('click', newBoundFunc);
    }


    
    
}

function handleSquareClickForShipPlacement(ship, driver, shipLength, squareCoord) {

    chooseDirDialog(driver, ship, shipLength, squareCoord);
    
    // ship.classList.remove('selected-ship'); // Remove selection after a square is clicked
    // const realSquares = document.querySelectorAll('.my-board .square');
    // driver.startPlacingProcess();
    // ship.classList.add('ship-disabled');
    // for (let s of realSquares) {
    //     s.classList.add('done-disabled');    
    // }

}

function squareClick(driver, square) {
    driver.playTurn(square);

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
    square.classList.add('hit', 'done-disabled');
}

function showMiss(square) {
    square.classList.add('miss', 'done-disabled');
}

function resetButton() {
    const resetGame = document.createElement('button');
    resetGame.classList.add('reset-game');
    resetGame.textContent = 'Reset Game';
    resetGame.addEventListener('click', populateGame);
    const buttonBox = document.querySelector('.button-box');
    buttonBox.appendChild(resetGame);
}



export { populateGame, showHit, showMiss, resetButton };