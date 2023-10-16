const seedrandom = require('seedrandom');

class Grid {
  constructor(difficulty, playerTurn) {
    this.difficulty = difficulty;
    if (difficulty === "easy") {
      this.size = 6;
      this.numMines = 11;
    } else if (difficulty === "medium") {
      this.size = 9;
      this.numMines = 25;
    } else if (difficulty === "hard") {
      this.size = 12;
      this.numMines = 43;
    }
    this.minefield = this.generateMinefield();
    this.revealedCells = new Array(this.size)
      .fill(null)
      .map(() => new Array(this.size).fill(false));
    this.revealedBombs = 0;
    this.playerTurn = playerTurn;
    this.score = [0, 0];
    this.end = false;
  }

  generateMinefield = (seed) => {
    const rng = seedrandom(seed); // Use a consistent seed for randomness
    const randomGrid = Array(this.size)
      .fill()
      .map(() => Array(this.size).fill(0));
    let i = 0;
    const positions = [];
    while (i < this.numMines) {
      let random = Math.floor(rng() * (this.size * this.size - 1));
      if (!positions.includes(random)) {
        positions.push(random);
        randomGrid[Math.floor(random / this.size)][random % this.size] = 1;
        i++;
      }
    }
    return randomGrid;
  };

  move = (row, col, player) => {
    if (!this.minefield[row][col] && !this.end) {
      this.revealedCells[row][col] = true;
      if (this.minefield[row][col]) {
        this.score[player]++;
        this.revealedBombs++;
      }
    }
  };

  switchTurn = () => {
    if (this.playerTurn === 0) {
      this.playerTurn = 1
    } else if (this.playerTurn === 1) {
      this.playerTurn = 0;
    }
  };

  reset = () => {
    this.minefield = this.generateMinefield();
    this.revealedCells = new Array(this.size)
      .fill(null)
      .map(() => new Array(this.size).fill(false));
    if (this.score[0] > this.score[1]) {
      this.playerTurn = 0;
    } else {
      this.playerTurn = 1;
    }
    this.score = [0, 0];
  };

  checkEnd = () => {
    return this.revealedBombs === this.numMines;
  };
}

module.exports = Grid;
