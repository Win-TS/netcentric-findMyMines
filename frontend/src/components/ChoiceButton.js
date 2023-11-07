import React from "react";

const ChoiceButton = ({ type, choice, label, onChoice, playBgm }) => {
  const handleChoiceClick = () => {
    if (choice === "new" || choice === "join") {
      playBgm();
    }
    onChoice(choice);
  };

  return (
    <div className={`btn btn-${type}`} onClick={handleChoiceClick}>
      {label}
    </div>
  );
};

export default ChoiceButton;
