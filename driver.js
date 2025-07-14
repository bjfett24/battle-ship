import { Player } from "./player-class.js";
import { showHit, showMiss } from "./game-page.js";

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

        console.log(this.realPlayerBoard.getMatrix());
        console.log(this.comPlayerBoard.getMatrix());

        this.populateShipsDOM(realPlayer);

    }

    playTurn(square) {
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

    

    


    populateShipsDOM(player) {
        const ships = player.board.getShips();
        for (let ship of ships) {
            const square = document.querySelector(`.sq${ship[0]}-${ship[1]}`);
            square.classList.add('ship');
        }
    }
}

export { Driver };
