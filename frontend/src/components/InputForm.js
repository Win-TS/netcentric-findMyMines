import React from "react";
import Input from "./Input";
import ChoiceButton from "./ChoiceButton";

const InputForm = (props) => {
  const {
    stepBack,
    onSubmit,
    onTyping,
    setDifficulty,
    newGame,
    name,
    room,
    nightTheme,
  } = props;

  if (newGame) {
    return (
      <div className={`input-container${nightTheme ? "-night" : ""}`}>
        <div className={`name-box${nightTheme ? "-night" : ""}`}>
          <Input
            name="name"
            placeholder="Type you name"
            onChange={onTyping}
            value={name}
          />
        </div>
        <div className={`seldiff${nightTheme ? "-night" : ""}`}>
          <h1>Select Difficulty</h1>
        </div>
        <div className={`difficulty-buttons${nightTheme ? "-night" : ""}`}>
          <div className={`easy${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="easy"
              choice="easy"
              onChoice={setDifficulty}
              label="Easy"
              className="easy1"
            />
          </div>
          <div className={`med${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="medium"
              choice="medium"
              onChoice={setDifficulty}
              label="Medium"
            />
          </div>
          <div className={`hard${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="hard"
              choice="hard"
              onChoice={setDifficulty}
              label="Hard"
            />
          </div>
        </div>
        <div className={`nav-container${nightTheme ? "-night" : ""}`}>
          <div className={`backbtn${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="nav-back"
              choice="back"
              onChoice={stepBack}
              label="Back"
            />
          </div>
          <div className={`joinbtn${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="nav-forward"
              choice="submit"
              onChoice={onSubmit}
              label="Start Game"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`input-container${nightTheme ? "-night" : ""}`}>
        <div className={`title${nightTheme ? "-night" : ""}`}>FINDMYMINES</div>
        <div className={`namebox${nightTheme ? "-night" : ""}`}>
          <Input
            name="name"
            placeholder="Your Name..."
            onChange={onTyping}
            value={name}
          />
        </div>
        <div className={`roombox${nightTheme ? "-night" : ""}`}>
          <Input
            name="room"
            placeholder="Room ID..."
            onChange={onTyping}
            value={room}
          />
        </div>
        <div className={`nav-container${nightTheme ? "-night" : ""}`}>
          <div className={`backbtn${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="nav-back"
              choice="back"
              onChoice={stepBack}
              label="Back"
            />
          </div>
          <div className={`joinbtn${nightTheme ? "-night" : ""}`}>
            <ChoiceButton
              type="nav-forward"
              choice="submit"
              onChoice={onSubmit}
              label="JOIN GAME"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default InputForm;
