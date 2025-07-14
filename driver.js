import { Player } from "./player-class.js";

class Driver {
    constructor() {
        this.gameStatus = undefined;
        this.realPlayerBoard;
        this.comPlayerBoard;
    }
    setShips() {
        const setShips = document.querySelector('.set-ships');
        setShips.remove();

        const resetGame = document.createElement('button');
        resetGame.classList.add('reset-game');
        resetGame.textContent = 'Reset Game';
        const buttonBox = document.querySelector('.button-box');
        buttonBox.appendChild(resetGame);

        const realPlayer = new Player('real');
        const comPlayer = new Player('com');

        realPlayer.board.populateShips();
        comPlayer.board.populateShips();

        this.realPlayerBoard = realPlayer.board;
        this.comPlayerBoard = comPlayer.board;

        this.populateShipsDOM(realPlayer);

    }

    playTurn(classList) {
        const coord = [classList[1].slice(2, 3), classList[1].slice(4, 5)];
        this.checkComBoard(coord);
        this.comPlayerBoard.receiveAttack(coord);


    }

    checkComBoard(coord) {
        if (this.comPlayerBoard.inspectBoard(coord) != 'empty') {
            console.log('hit');
            return 'hit';
        } else {
            console.log('miss');
            return 'miss';
        }
    }


    populateShipsDOM(player) {
        const ships = player.board.getShips();
        for (let ship of ships) {
            const square = document.querySelector(`.sq${ship[0]}-${ship[1]}`);
            square.classList.add('ship');
        }
    }
}

export { Driver };
