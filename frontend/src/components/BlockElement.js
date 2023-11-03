import React, { useState, useEffect } from "react";
import bombImg from "../assets/bomb.svg";
import crossImg from "../assets/cross.svg";
import goldenBombImg from "../assets/goldenBomb.png";
import bombsound from "../assets/bombsound.mp3";

const BlockElement = (props) => {
  const [bombSound] = useState(new Audio(bombsound));
  useEffect(() => {
    if (props.revealed && (props.mine === 1 || props.mine === 2)) {
      bombSound.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [props.revealed, props.mine]);

  if (props.revealed) {
    if (props.mine === 1) {
      return <img src={bombImg} width="40px" height="40px" alt="bomb" />;
    } else if (props.mine === 2) {
      return <img src={goldenBombImg} width="40px" height="40px" alt="bomb" />;
    } else {
      return <img src={crossImg} alt="cross" width="40px" height="40px" />;
    }
  }
  return <p>Block</p>;
};

export default BlockElement;
