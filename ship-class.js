import { sunkDisplay } from "./game-page.js";
class Ship {

    constructor(length, coord, direction, type, hits = 0, sunk = false) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
        this.startCoord = coord;
        this.direction = direction;
        this.type = type;
    }



    hit() {
        this.hits++;
        if (this.hits >= this.length) {
            this.sunk = true;
            sunkDisplay(this.startCoord, this.direction, this.length, this.type)

        }
        return this.hits;
    }

    isSunk() {
        if (this.hits >= this.length) {
            return true;
        } else return false;
    }
}

export { Ship };