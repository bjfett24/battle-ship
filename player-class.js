import { GameBoard } from "./gameboard-class.js";

class Player {
    constructor(type) {
        this.type = type;
        this.board = new GameBoard(type);
    }
}

export { Player };