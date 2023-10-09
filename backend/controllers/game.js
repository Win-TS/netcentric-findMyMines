let size = 0;
let bombs = 0;
let grid;

exports.bombRandom = (req, res) => {
    
    const positions = [];

    if (req.params.difficulty === "easy") {
        size = 6;
        bombs = 11;
    } else if (req.params.difficulty === "medium") {
        size = 9;
        bombs = 24;
    } else if (req.params.difficulty === "hard") {
        size = 12;
        bombs = 43;
    }

    grid = Array(size).fill().map(() => Array(size).fill(0));
    
    let i = 0;
    while (i < bombs) {
        let random = Math.floor(Math.random() * (size * size - 1));
        if (!positions.includes(random)) {
            positions.push(random);
            grid[Math.floor(random/size)][random%size] = 1;
            i++;
        }
    }

    console.log(grid);
    res.json({grid});

};