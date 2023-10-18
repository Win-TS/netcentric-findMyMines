import React from "react";

const ResultModal = ({ score, opponentScore, end }) => {
  if (end) {
    if (score > opponentScore) {
      return <h1>You Win!!!</h1>;
    } else {
      return <h1>You Lose!!!</h1>;
    }
  }
  return <div></div>;
};

export default ResultModal;
