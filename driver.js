import { Player } from "./player-class.js";
import { showHit, showMiss, populateGame} from "./game-page.js";

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

    setRealShip(coord, length, direction) {

        const realPlayer = new Player('real');
        realPlayer.board.placeShip(coord, length, direction);

        this.realPlayerBoard = realPlayer.board;

        this.populateShipsDOM(realPlayer);

        this.placedShips.push(length);

        if (this.placedShips.length == 4) {
            const readyButton = document.createElement('button');
            readyButton.classList.add('ready');
            readyButton.textContent = 'Ready';
            readyButton.addEventListener('click', () => {
                this.comPlayerBoard.populateShips();
            })


            const buttonBox = document.querySelector('.button-box');
            buttonBox.appendChild(readyButton)
            
            
        }





    }

    playTurn(square) {
        for (let sq of this.comSquares) {
            sq.classList.add('disabled');
        }


        const classList = square.classList;
        const coord = [classList[1].slice(2, 3), classList[1].slice(4, 5)];
        const isHit = this.checkComSquare(coord);
        this.comPlayerBoard.receiveAttack(coord);

        if (isHit) {
            showHit(square);
        } else {
            showMiss(square);
        }

        if (this.comPlayerBoard.checkEnd() == true) {
            console.log('End of Game');
        }

        setTimeout(() => {
            this.comAttack();
            for (let sq of this.comSquares) {
                sq.classList.remove('disabled');
            }

        }, 1000);

    }

    comAttack() {
        let coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
        const isHit = this.checkRealPlayerSquare(coord);

        while (this.realPlayerBoard.includesPlay(coord)) {
            coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
        }
        this.realPlayerBoard.receiveAttack(coord);


        const square = document.querySelector(`.my-board .sq${coord[0]}-${coord[1]}`)

        if (isHit) {
            showHit(square)
        } else {
            showMiss(square);
        }

        if (this.realPlayerBoard.checkEnd() == true) {
            console.log('End of Game');
        }

    }

    checkComSquare(coord) {
        if (this.comPlayerBoard.inspectBoard(coord) != 'empty') {
            console.log('hit');
            return true;
        } else {
            console.log('miss');
            return false;
        }
    }

    checkRealPlayerSquare(coord) {
        if (this.realPlayerBoard.inspectBoard(coord) != 'empty') {
            console.log('hit');
            return true;
        } else {
            console.log('miss');
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
