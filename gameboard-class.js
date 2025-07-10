import { Ship } from './ship-class.js';
class GameBoard {
    constructor() {
        this.width = 10;
        this.matrix = [];
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = new Array(10);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = null;
            }
        }
    }

    populateShips() {

    }

    placeShip(coord, length, direction) {
        const newShip = new Ship(length)
        this.matrix[coord[0]][coord[1]] = newShip;
        if (direction == 'h') {
            for (let i = 1; i < length; i++) {
                this.matrix[coord[0] + i][coord[1]] = newShip;
            }
        } else {
            for (let i = 1; i < length; i++) {
                this.matrix[coord[0]][coord[1] + i] = newShip;
            }
        }
    }
}