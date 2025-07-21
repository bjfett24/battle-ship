import { Ship } from './ship-class.js';
class GameBoard {
    constructor(type = null) {
        this.matrix = [];
        for (let i = 0; i < 10; i++) {
            this.matrix[i] = new Array(10);
            for (let j = 0; j < 10; j++) {
                this.matrix[i][j] = 'empty';
            }
        }
        this.misses = [];
        this.plays = [];
        this.shipObjects = [];
        this.type = type;
        }
        

    getMatrix() {
        return this.matrix;
    }

    checkForClearing(coord, direction, length) {
        coord = this.checkEdge(coord, length, direction);
        console.log(coord);
        
        
        let clear = true;
        if (direction === 'h') {
            for (let i = 1; i < length; i++) {
                const currentCoord = [coord[0] + i, coord[1]]
                if (this.includesShip(currentCoord)) {
                    clear = false;
                    break;
                }
            }
        } else if (direction === 'v') {
            for (let i = 1; i < length; i++) {
                const currentCoord = [coord[0], coord[1] + i]
                if (this.includesShip(currentCoord)) {
                    clear = false;
                    break;
                }
            }
        }

        return clear;
    }

    populateShips() {
        for (let i = 2; i < 6; i++) {
            let direction;
            if (Math.random() > 0.5) {
                direction = 'h';
            } else {
                direction = 'v';
            }
            let coord = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * (10))];
            if (direction == 'h') {
                if (coord[0] + (i - 1) > 9) {
                    coord = [10 - i, coord[1]];                                                                                                     
                }
            } else {
                if (coord[1] + (i - 1) > 9) {
                    coord = [coord[0], 10 - i];                                                                                                     
                }
            }
            coord = this.moveShip(coord, i, direction);
            this.placeShip(coord, i, direction, 'com');
        }

        console.log(this.matrix);
    }

    moveShip(coord, length, direction) {
        let clear;
        if (direction == 'h') {
            clear = true;
            for (let j = 0; j < length; j++) {
                if (this.includesShip([coord[0] + j, coord[1]])) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                return coord;
            } else {
                if (coord[1] + 1 > 9) {
                    return this.moveShip([coord[0], 0], length, direction)
                } else {
                    return this.moveShip([coord[0], coord[1] + 1], length, direction)
                }
            }
        } else if (direction == 'v') {
            clear = true;
            for (let j = 0; j < length; j++) {
                if (this.includesShip([coord[0], coord[1] + j])) {
                    clear = false;
                }
            }
            if (clear) {
                return coord;
            } else {
                if (coord[0] + 1 > 9) {
                    return this.moveShip([0, coord[1]], length, direction)
                } else {
                    return this.moveShip([coord[0] + 1, coord[1]], length, direction)
                }
            }
        }
    }

    checkEdge(coord, length, direction) {
        if (direction == 'h') {
            if (coord[0] + length - 1 > 9) {
                return [9 - (length - 1), coord[1]];
            } else {
                return [coord[0], coord[1]];
            }
        } else {
            if (coord[1] + length - 1 > 9) {
                    return [coord[0], 9 - (length - 1)];            
            } else {
                    return [coord[0], coord[1]];
            }
        }
    }

    placeShip(coord, length, direction, type = null) {
        const newShip = new Ship(length, coord, direction, type);

        this.shipObjects.push(newShip);

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
        this.plays.push(coord);
        if (this.matrix[coord[0]][coord[1]] == 'empty') {
            this.misses.push(coord);
        } else {
            this.matrix[coord[0]][coord[1]].hit();
        }
    }

    getPlays() {
        return this.plays;
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
        const ships = this.shipObjects;
        const liveShips = ships.filter(ship => {
            if (ship.sunk == false) {
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

    includesShip(coord) {
        const ships = this.getShips();
        let result = false;
        for (let ship of ships) {
            if (ship[0] == coord[0] && ship[1] == coord[1]) {
                result = true;
                break;
            }
        }
        return result;
    }

    includesPlay(coord) {
        const plays = this.plays;
        let result = false;
        for (let play of plays) {
            if (play[0] == coord[0] && play[1] == coord[1]) {
                result = true;
                break;
            }
        }
    }
}



export { GameBoard }