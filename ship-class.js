class Ship {
    constructor(length, hits = 0, sunk = false) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits++;
        if (this.hits >= this.length) {
            this.sunk = true;
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