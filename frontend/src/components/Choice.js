import React from "react";
import ChoiceButton from "./ChoiceButton";

const Choice = ({ logo, onChoice, nightTheme }) => {
  return (
    <>
      <div className={`choice-container${nightTheme ? '-night' : ''}`}>
        {/* <a href="/"><img src={logo} alt='FindMyMines'/></a> */}
        <div className={`startnew${nightTheme ? '-night' : ''}`}>
          <ChoiceButton
            onChoice={onChoice}
            type="primary"
            choice="new"
            label="Start New Game"
          />
        </div>
        <div className={`joingame${nightTheme ? '-night' : ''}`}>
          <ChoiceButton
            onChoice={onChoice}
            type="secondary"
            choice="join"
            label="Join Game"
          />
        </div>
      </div>
    </>
  );
};

export default Choice;
