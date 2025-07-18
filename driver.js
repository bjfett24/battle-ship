import { Player } from "./player-class.js";
import { showHitOrMiss, squareClick, resetButton, handleSquareAbility} from "./game-page.js";

class Driver {
    constructor() {
        this.gameStatus = undefined;
        this.realPlayer = new Player('real');
        this.comPlayer = new Player('com');
        this.realPlayerBoard = this.realPlayer.board;
        this.comPlayerBoard = this.comPlayer.board;
        this.comSquares = document.querySelectorAll('.com-board .square');
        this.placedShips = [];
        this.placingProcess = { 'start': null };
        this.boundFuncRef = new Map();
    }

    setBoundFuncRef(square, newFunc) {
        this.boundFuncRef.set(square, newFunc);
    }

    getBoundFuncRef(square) {
        return this.boundFuncRef.get(square);
    }

    clearAllSquareHandlers() {
        // Iterate over the Map and remove listeners
        this.myBoardSquareHandlers.forEach((handler, square) => {
            square.removeEventListener('click', handler);
            square.classList.remove('done-disabled'); // Also remove done-disabled here
        });
        this.myBoardSquareHandlers.clear(); // Clear the map
    }

    setShips() {
        const setShips = document.querySelector('.set-ships');
        setShips.remove();



        // const realPlayer = new Player('real');
        // realPlayer.board.populateShips();

        this.comPlayerBoard.populateShips();

        // this.populateShipsDOM(realPlayer);

    }

    setRealShip(driver, coord, length, direction, type) {
        this.realPlayerBoard.placeShip(coord, length, direction, type);

        this.populateShipsDOM(this.realPlayer);

        this.placedShips.push(length);

        if (this.placedShips.length === 4) {
            this.startGame(driver);
        }
    }

    startGame(driver) {
        const comSquares = document.querySelectorAll('.com-board .square');

        resetButton('remove');
        
        this.populateReadyButton();

        handleSquareAbility(comSquares, false)
        for (let square of comSquares) {
            square.addEventListener('click', function() {squareClick(driver, this)});
        }
    }

    populateReadyButton() {
        const comSquares = document.querySelectorAll('.com-board .square');
        const readyButton = document.createElement('button');
        readyButton.classList.add('ready');
        readyButton.textContent = 'Ready';
        readyButton.addEventListener('click', () => {
            for (let square of comSquares) {
                square.classList.remove('done-disabled')
            }
            this.comPlayerBoard.populateShips();
            readyButton.remove();
            resetButton();
        })
        const buttonBox = document.querySelector('.button-box');
        buttonBox.appendChild(readyButton)
    }

    getSquareCoord(square) {
        const classList = square.classList;
        return [classList[1].slice(2, 3), classList[1].slice(4, 5)];
    }

    

    playTurn(square) {
        for (let sq of this.comSquares) {
            sq.classList.add('disabled');
        }
        const coord = this.getSquareCoord(square);
        const isHit = this.checkComSquare(coord);
        this.comPlayerBoard.receiveAttack(coord);

        showHitOrMiss(isHit, square);

        this.endAction('real');


        setTimeout(() => {
            this.comAttack();
            for (let sq of this.comSquares) {
                sq.classList.remove('disabled');
            }

        }, 1000);

    }

    endAction(type) {
        if (type === 'real') {
            if (this.comPlayerBoard.checkEnd() === true) {
            console.log('End of Game');
            const squares = document.querySelectorAll('.square');
            handleSquareAbility(squares, false);
            }
        } else if (type === 'com') {
            if (this.realPlayerBoard.checkEnd() == true) {
                console.log('End of Game');
                const squares = document.querySelectorAll('.square');
                handleSquareAbility(squares, false);
            }
        }
    }

    getFreeCoord() {
        let coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];

        while (this.realPlayerBoard.includesPlay(coord)) {
            coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
        }

        return coord;
    }

    comAttack() {
        const coord = this.getFreeCoord();
        this.realPlayerBoard.receiveAttack(coord);
        const square = document.querySelector(`.my-board .sq${coord[0]}-${coord[1]}`)
        const isHit = this.checkRealPlayerSquare(coord);

        showHitOrMiss(isHit, square);

        this.endAction('com');

    }

    checkComSquare(coord) {
        if (this.comPlayerBoard.inspectBoard(coord) != 'empty') {
            return true;
        } else {
            return false;
        }
    }

    checkRealPlayerSquare(coord) {
        if (this.realPlayerBoard.inspectBoard(coord) != 'empty') {
            return true;
        } else {
            return false;
        }
    }
    populateShipsDOM(player) {
        const ships = player.board.getShips();
        for (let ship of ships) {
            const square = document.querySelector(`.sq${ship[0]}-${ship[1]}`);
            square.classList.add('ship');
        }
    }

    startPlacingProcess() {
        this.placingProcess['start'] = true;
    }

    getPlacingProcess() {
        return this.placingProcess;
    }
}

export { Driver };
