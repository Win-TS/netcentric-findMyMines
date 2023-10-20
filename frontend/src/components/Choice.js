import React from "react";
import ChoiceButton from "./ChoiceButton";

const Choice = ({ logo, onChoice }) => {
  return (
    <>
      <div className="choice-container">
        {/* <a href="/"><img src={logo} alt='FindMyMines'/></a> */}
        <div className="startnew">
          <ChoiceButton
            onChoice={onChoice}
            type="primary"
            choice="new"
            label="Start New Game"
          />
        </div>
        <div className="joingame">
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
