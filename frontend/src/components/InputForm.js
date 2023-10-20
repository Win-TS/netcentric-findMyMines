import React from "react";
import Input from "./Input";
import ChoiceButton from "./ChoiceButton";

const InputForm = (props) => {
  const { stepBack, onSubmit, onTyping, setDifficulty, newGame, name, room } =
    props;

  if (newGame) {
    return (
      <div className="input-container">
        <div className = "name-box">
        <Input
          name="name"
          placeholder="Type you name"
          onChange={onTyping}
          value={name}
        /></div>
        <div className = "seldiff"><h1>Select Difficulty</h1></div>
        <div className="difficulty-buttons">
          <div className="easy">
          <ChoiceButton
            type="easy"
            choice="easy"
            onChoice={setDifficulty}
            label="Easy"
            className="easy1"
          /></div>
          <div className="med">
          <ChoiceButton
            type="medium"
            choice="medium"
            onChoice={setDifficulty}
            label="Medium"
          /></div>
          <div className="hard">
          <ChoiceButton
            type="hard"
            choice="hard"
            onChoice={setDifficulty}
            label="Hard"
          /></div>
        </div>
        <div className="nav-container">
          <ChoiceButton
            type="nav-back"
            choice="back"
            onChoice={stepBack}
            label="Back"
          />
          <ChoiceButton
            type="nav-forward"
            choice="submit"
            onChoice={onSubmit}
            label="Start Game"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="input-container">
        <div className="title">FINDMYMINES</div>
        <div className="namebox">
          <Input
            name="name"
            placeholder="Your Name..."
            onChange={onTyping}
            value={name}
          />
        </div>
        <div className="roombox">
          <Input
            name="room"
            placeholder="Room ID..."
            onChange={onTyping}
            value={room}
          />
        </div>
        <div className="nav-container">
          <div className="backbtn">
            <ChoiceButton
              type="nav-back"
              choice="back"
              onChoice={stepBack}
              label="Back"
            />
          </div>
          <div className="joinbtn">
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