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
    this.streakBombs = [0, 0];
    this.playerTurn = playerTurn;
    this.score = [0, 0];
    this.end = false;
  }

  generateMinefield = () => {
    const randomGrid = Array(this.size)
      .fill()
      .map(() => Array(this.size).fill(0));
    const totalMines = this.numMines;
    const numTwos = Math.floor(totalMines / 4);
    let i = 0;
    while (i < numTwos) {
      let row = Math.floor(Math.random() * this.size);
      let col = Math.floor(Math.random() * this.size);
      if (randomGrid[row][col] !== 2) {
        randomGrid[row][col] = 2;
        i++;
      }
    }
    i = 0;
    while (i < totalMines - numTwos) {
      let row = Math.floor(Math.random() * this.size);
      let col = Math.floor(Math.random() * this.size);
      if (randomGrid[row][col] !== 2) {
        randomGrid[row][col] = 1;
        i++;
      }
    }
    return randomGrid;
  };

  move = (row, col, player) => {
    if (!this.revealedCells[row][col] && !this.end) {
      this.revealedCells[row][col] = true;
      if (this.minefield[row][col] === 1) {
        this.score[player]++;
        this.revealedBombs++;
        if (this.streakBombs[player] < 2) {
          this.streakBombs[player]++;
        } else if (this.streakBombs[player] === 2) {
          this.score[player]++;
          this.streakBombs[player] = 0;
        }
        console.log(player, this.score);
      } else if (this.minefield[row][col] === 2) {
        this.score[player] += 3;
        this.revealedBombs++;
        if (this.streakBombs[player] < 2) {
          this.streakBombs[player]++;
        } else if (this.streakBombs[player] === 2) {
          this.score[player]++;
          this.streakBombs[player] = 0;
        }
        console.log(player, this.score);
      }
    } else {
      this.streakBombs[player] = 0;
    }
  };

  switchTurn = () => {
    if (this.playerTurn === 0) {
      this.playerTurn = 1;
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
    this.streakBombs = [0, 0];
    this.revealedBombs = 0;
  };

  checkEnd = () => {
    const totalScore = (this.numMines * 3/4) + ((this.numMines * 1/4) * 3)
    return this.score.some(
      (playerScore) => playerScore === Math.ceil(totalScore / 2)
    );
  };
}

module.exports = Grid;
