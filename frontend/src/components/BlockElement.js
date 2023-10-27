import React from "react";
import bombImg from "../assets/bomb.svg";
import crossImg from "../assets/cross.svg";
import goldenBombImg from "../assets/goldenBomb.png";


const BlockElement = (props) => {
  if (props.revealed) {
    if (props.mine === 1) {
      return <img src={bombImg} width='40px' height='40px'alt="bomb"  />;
    } else if (props.mine === 2) {
      //return <img src={bombImg} alt="bomb" />;
      return <img src={goldenBombImg} width='40px' height='40px'alt="bomb"  />;
    } else {
      return <img src={crossImg} alt="cross" width='40px' height='40px'/>;
    }
  }
  return <p>Block</p>;
};

export default BlockElement;
