import { Player } from "./player-class.js";

function driveGame() {
    const gameStatus = undefined;

    const realPlayer = new Player('real');
    const comPlayer = new Player('com');

    realPlayer.board.populateShips();
    comPlayer.board.populateShips();

    populateShips(realPlayer);

}


function populateShips(player) {
    const ships = player.board.getShips();
    for (let ship of ships) {
        const square = document.querySelector(`.sq${ship[0]}-${ship[1]}`);
        square.classList.add('ship');
    }
}

export { driveGame }
