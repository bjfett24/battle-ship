import { Player } from "./player-class.js";

function driveGame() {
    const gameStatus = undefined;
    
    const realPlayer = new Player('real');
    const comPlayer = new Player('com');

    realPlayer.board.populateShips();
    comPlayer.board.populateShips();


}

