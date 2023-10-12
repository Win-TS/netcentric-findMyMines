import React from "react";
import Input from "./Input";
import ChoiceButton from "./ChoiceButton";

const InputForm = (props) => {
  const { stepBack, onSubmit, onTyping, setDifficulty, newGame, name, room } =
    props;

  if (newGame) {
    return (
      <div className="input-container">
        <Input
          name="name"
          placeholder="Your Name..."
          onChange={onTyping}
          value={name}
        />
        <div className="difficulty-buttons">
          <ChoiceButton
            type="easy"
            choice="easy"
            onChoice={setDifficulty}
            label="Easy"
          />
          <ChoiceButton
            type="medium"
            choice="medium"
            onChoice={setDifficulty}
            label="Medium"
          />
          <ChoiceButton
            type="hard"
            choice="hard"
            onChoice={setDifficulty}
            label="Hard"
          />
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
        <Input
          name="name"
          placeholder="Your Name..."
          onChange={onTyping}
          value={name}
        />
        <Input
          name="room"
          placeholder="Room ID..."
          onChange={onTyping}
          value={room}
        />
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
            label="Join Game"
          />
        </div>
      </div>
    );
  }
};

export default InputForm;
