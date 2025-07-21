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

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board', 'container');
    container.appendChild(boardContainer);

    const messageBoard = document.createElement('div');
    messageBoard.classList.add('message-board');
    messageBoard.textContent = 'Place Your Ships!';
    boardContainer.appendChild(messageBoard);

    const sideBoard = document.createElement('div');
    sideBoard.classList.add('side-board');
    boardContainer.appendChild(sideBoard);

    const buttonBox = document.createElement('div');
    buttonBox.classList.add('button-box');
    sideBoard.appendChild(buttonBox);

    resetButton();

    const shipDock = document.createElement('div');
    shipDock.classList.add('ship-dock');
    sideBoard.appendChild(shipDock);

    const myBoard = document.createElement('div');
    myBoard.classList.add('my-board');
    boardContainer.appendChild(myBoard);

    const comBoard = document.createElement('div');
    comBoard.classList.add('com-board');
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

    popMockShips(shipConts, driver);

}

function popMockShips(shipConts, driver) {
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
}

function selectShip(ship, driver) {
    const shipClass = ship.classList[1];
    const shipLength = +shipClass.slice(shipClass.length - 1, shipClass.length);
   
    const previouslySelected = document.querySelector('.selected-ship');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected-ship');
    }
    ship.classList.add('selected-ship');
    
    const realSquares = document.querySelectorAll('.my-board .square');

    removeSquarePlacing(realSquares, driver);
    addSquarePlacing(realSquares, ship, driver, shipLength);
}

function addSquarePlacing(realSquares, ship, driver, shipLength) {
    const pointer = 'dummy';
    for (let square of realSquares) {
        const squareClass = square.classList[1];
        const squareCoord = [+squareClass.slice(2, 3), +squareClass.slice(4, 5)];
        const newBoundFunc = handleSquareClickForShipPlacement.bind(pointer, ship, driver, shipLength, squareCoord);
        driver.setBoundFuncRef(square, newBoundFunc);
        square.addEventListener('click', newBoundFunc);
    }  
}

function removeSquarePlacing(realSquares, driver) {
    const lastShip = driver.getPlacingProcess();
    if (lastShip['start'] === true) {
        for (let square of realSquares) {
            square.classList.remove('place-disabled');
            const oldBoundFunc = driver.getBoundFuncRef(square);
            square.removeEventListener('click', oldBoundFunc);
        }
    }
}

function handleSquareClickForShipPlacement(ship, driver, shipLength, squareCoord) {

    chooseDirDialog(driver, ship, shipLength, squareCoord);

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
    changeMessageBoard('Hit!');
}

function showMiss(square) {
    square.classList.add('miss', 'done-disabled');
    changeMessageBoard('Miss!')
}

function resetButton(command = undefined) {
    if (command === 'remove') {
        const resetButton = document.querySelector('.reset-game');
        resetButton.remove();
    } else {
        const resetGame = document.createElement('button');
        resetGame.classList.add('reset-game');
        resetGame.textContent = 'Reset Game';
        resetGame.addEventListener('click', populateGame);
        const buttonBox = document.querySelector('.button-box');
        buttonBox.appendChild(resetGame);
    }
}

function sunkDisplay(coord, direction, length, type) {
    let youSunk;
    if (direction === 'h') {
        for (let i = 0; i < length; i++) {
            const currentCoord = [coord[0] + i, coord[1]];
            if (type === 'real') {
                const square = document.querySelector(`.my-board .sq${currentCoord[0]}-${currentCoord[1]}`);
                square.classList.add('sunk');
                square.classList.remove('hit');
                youSunk = true;
            } else if (type === 'com') {
                const square = document.querySelector(`.com-board .sq${currentCoord[0]}-${currentCoord[1]}`);
                square.classList.add('sunk');
                square.classList.remove('hit');
                youSunk = false
            }
        }
    } else if (direction === 'v') {
        for (let i = 0; i < length; i++) {
            const currentCoord = [coord[0], coord[1] + i];
            if (type === 'real') {
                const square = document.querySelector(`.my-board .sq${currentCoord[0]}-${currentCoord[1]}`);
                square.classList.add('sunk');
                square.classList.remove('hit');
                youSunk = true;
            } else if (type === 'com') {
                const square = document.querySelector(`.com-board .sq${currentCoord[0]}-${currentCoord[1]}`);
                square.classList.add('sunk');
                square.classList.remove('hit');
                youSunk = false;
            }
        }
    }
    if (!youSunk) {
        changeMessageBoard('Nice Sinker!');
    } else {
        changeMessageBoard('Your ship was sunk.');
    }
}

function showHitOrMiss(isHit, square) {
    if (isHit) {
        showHit(square);
    } else {
        showMiss(square);
    }
}

function shipSelection(ship, selected) {
    if (selected) {
        ship.classList.add('selected-ship')
    } else {
        ship.classList.remove('selected-ship');
    }
}

function disableShip(ship) {
    ship.classList.add('ship-disabled');
}

function handleSquareAbility(squares, enable) {
    for (let s of squares) {
        if (enable) {
            s.classList.remove('done-disabled');
        } else {
            s.classList.add('done-disabled');   
        }
    }
}

function squarePlacement(squares, enable) {
    for (let s of squares) {
        if (enable) {
            s.classList.remove('place-disabled');
        } else {
            s.classList.add('place-disabled');   
        }
    }
}

function changeMessageBoard(str) {
    const messageBoard = document.querySelector('.message-board');
    messageBoard.textContent = str;
}



export { populateGame, showHit, showMiss, resetButton, squareClick, sunkDisplay, popMockShips, shipSelection, disableShip, handleSquareAbility, showHitOrMiss, squarePlacement, changeMessageBoard};