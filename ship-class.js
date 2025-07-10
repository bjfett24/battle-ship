class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        return this.hits;
    }

    isSunk() {
        if (this.hits >= this.length) {
            return true;
        } else return false;
    }
}

export { Ship };