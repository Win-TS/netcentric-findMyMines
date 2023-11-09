import React from "react";
import ChoiceButton from "./ChoiceButton";

const Choice = ({ onChoice, nightTheme, playBgm }) => {
  return (
    <>
      <div className={`choice-container${nightTheme ? "-night" : ""}`}>
        <div className={`startnew${nightTheme ? "-night" : ""}`}>
          <ChoiceButton
            onChoice={onChoice}
            type="none"
            choice="new"
            label="Start New Game"
            playBgm={playBgm}
          />
        </div>
        <div className={`joingame${nightTheme ? "-night" : ""}`}>
          <ChoiceButton
            onChoice={onChoice}
            type="none"
            choice="join"
            label="Join Game"
            playBgm={playBgm}
          />
        </div>
      </div>
    </>
  );
};

export default Choice;
