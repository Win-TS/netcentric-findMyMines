import React from "react";

const Scoreboard = ({ player, playerScore, opponent, opponentScore }) => {
  return (
    <div className="scoreboard">
      <div className="scoreboard-player">
        <h1>{player}</h1>
        <h3>{playerScore}</h3>
      </div>
    </div>
  );
};

export default Scoreboard;