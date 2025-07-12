import { Player } from "./player-class.js";

class Driver {
    constructor() {
        this.gameStatus = undefined;
    }
    driveGame() {
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

        this.populateShipsDOM(realPlayer);

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
