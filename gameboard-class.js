import { Ship } from './ship-class.js';
class GameBoard {
    constructor() {
        this.matrix = [];
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = new Array(10);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = 'empty';
            }
        }
        this.misses = [];
        }

    getMatrix() {
        return this.matrix;
    }

    populateShips() {
        for (let i = 2; i < 6; i++) {
            //let coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
            for (let j = 0; j < i; i++) {

            }
            while (this.matrix[coord[0]][coord[1]] != 'empty' || 
                   this.matrix[coord[0] + i][coord[1]]) {
                coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
            }
            let direction;
            if (Math.random() > 0.5) {
                direction = 'h';
            } else {
                direction = 'v';
            }

            const ships = this.getShips();
            let coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
            coord = this.moveShip(coord, i, direction, ships);
            this.placeShip(coord, i, direction);
        }
    }

    moveShip(coord, length, direction, ships) {
        let clear = true;
        if (direction == 'h') {
            for (let j = 0; j < length; j++) {
                if (ships.includes([coord[0] + j, coord[1]])) {
                    clear = false;
                }
            }
            if (clear) {
                return coord;
            } else {
                if (coord[1] + 1 > 9) {
                    return this.moveShip([coord[0], 0], length, direction, ships)
                } else {
                    return this.moveShip([coord[0], coord[1] + 1], length, direction, ships)
                }
            }
        } else if (direction == 'v') {
            for (let j = 0; j < length; j++) {
                if (ships.includes([coord[0], coord[1] + j])) {
                    clear = false;
                }
            }
            if (clear) {
                return coord;
            } else {
                if (coord[0] + 1 > 9) {
                    return this.moveShip([0, coord[1]], length, direction, ships)
                } else {
                    return this.moveShip([coord[0] + 1, coord[1]], length, direction, ships)
                }
            }
        }
    }

    placeShip(coord, length, direction) {
        const newShip = new Ship(length);

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

    resetBoard() {
        this.matrix = [];
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = new Array(10);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = 'empty';
            }
        }
        this.misses = [];
    }

    getShips() {
        const ships = []
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.matrix[i][j] != 'empty') {
                    ships.push([i, j]);
                }
            }
        }
        return ships;
    }

    checkEnd() {
        const ships = this.getShips();
        const liveShips = ships.filter(ship => {
            const shipObj = this.inspectBoard(ship);
            if (shipObj.sunk == false) {
                return true;
            } else {
                return false;
            }
        });
        if (liveShips.length <= 0) {
            return true;
        } else {
            return false;
        }
    }
}



export { GameBoard }