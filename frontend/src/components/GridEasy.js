import React, { useEffect, useState } from "react";

const GridEasy = ({ minefield, revealedCell, handleClick, turn }) => {

  const size = 6;
  const handleCellClick = (row, col) => {
    handleClick(row, col);
  };

  useEffect(() => {
    const easyBoard = document.getElementById("easy-board");

    // Clear any existing tiles from the board
    easyBoard.innerHTML = "";

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Create a div element for each tile
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();

        // Check if the tile has a bomb (value is 1 in mineArray)
        if (minefield[r][c] === 1) {
          // Create an image element for the bomb and set its source
          let bombImage = document.createElement("img");
          bombImage.src = "path/to/bomb-image.png"; // Replace with the actual image path
          bombImage.style.display = "none"; // Hide the bomb image initially

          // Add a click event listener to the tile
          tile.addEventListener("click", () => {
            // Show the bomb image when the tile with a bomb is clicked
            bombImage.style.display = "block";
            //handleCellClick(r, c)
          });

          // Append the bomb image to the tile
          tile.appendChild(bombImage);
        } else {
          // If it's not a bomb, add a click event listener to the tile
          tile.addEventListener("click", () => {
            // Set the text content to "opened" when the tile is clicked
            tile.textContent = "opened";
            tile.style.fontSize = "12px";
            //handleCellClick(r, c)
          });
        }

        // Append the tile to the easyBoard
        easyBoard.appendChild(tile);
      }
    }
  }, []);

  return (
    <div>
      <div id="easy-board">
        {minefield.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${cell === 1 ? "bomb" : ""}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === 0 ? "opened" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridEasy;
