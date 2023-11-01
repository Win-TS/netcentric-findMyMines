import axios from "axios";
import React from "react";

const ResultModal = ({ score, opponentScore, end, restart }) => {
  if (end) {
    if (score > opponentScore) {
      return (
        <div>
          <h1>You Win!!!</h1>
          <button onClick={restart}>Restart</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You Lose!!!</h1>
          <button onClick={restart}>Restart</button>
        </div>
      );
    }
  }
  return <div></div>;
};

export default ResultModal;
