import React from "react";
import bombImg from "../assets/bomb.svg";

const BlockElement = (props) => {
  if (props.revealed) {
    if (props.mine === 1) {
      return <img src={bombImg} alt="bomb" />;
    } else if (props.mine === 2) {
      //return <img src={bombImg} alt="bomb" />;
      return <p>Golden Bomb</p>
    } else {
      return <p>Opened</p>;
    }
  }
  return <p>Block</p>;
};

export default BlockElement;
