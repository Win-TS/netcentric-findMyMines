import React from "react";

const Scoreboard = ({ player, playerScore, nightTheme }) => {
  return (
    <div className={`scoreboard${nightTheme ? '-night' : ''}`}>
      <div className={`scoreboard-player${nightTheme ? '-night' : ''}`}>
        <h1>{player}</h1>
        <h3>{playerScore}</h3>
      </div>
    </div>
  );
};

export default Scoreboard;
