import { Ship } from './ship-class.js';
class GameBoard {
    constructor() {
        this.width = 10;
        this.matrix = [];
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = new Array(10);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = 'empty';
            }
        }
        this.misses = [];
    }

    populateShips() {
        for (let i = 2; i < 6; i++) {
            let coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
            while (this.matrix[coord[0]][coord[1]] != 'empty') {
                coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
            }
            let direction;
            if (Math.random() > 0.5) {
                direction = 'h';
            } else {
                direction = 'v';
            }
            this.placeShip(coord, i, direction);
        }
    }

    placeShip(coord, length, direction) {
        const newShip = new Ship(length)

        if (direction == 'h') {
            if (coord[0] + length - 1 > 9) {
                for (let i = 9 - (length - 1); i <= 9; i++) {
                    this.matrix[i][coord[1]] = newShip;
                }
            } else {
                for (let i = 0; i < length; i++) {
                    this.matrix[coord[0] + i][coord[1]] = newShip;
                }
            }
        } else {
            if (coord[1] + length - 1 > 9) {
                for (let i = 9 - (length - 1); i <= 9; i++) {
                    this.matrix[coord[0]][i] = newShip;
                }
            } else {
                for (let i = 0; i < length; i++) {
                    this.matrix[coord[0]][coord[1] + i] = newShip;
                }
            }
        }
    }

    receiveAttack(coord) {
        if (this.matrix[coord[0]][coord[1]] == 'empty') {
            this.misses.push(coord);
        } else {
            this.matrix[coord[0]][coord[1]].hit();
        }
    }

    inspectBoard(coord) {
        return this.matrix[coord[0]][coord[1]];
    }
}



export { GameBoard }