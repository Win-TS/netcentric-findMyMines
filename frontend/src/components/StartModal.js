import React from "react";
import { useState, useEffect } from "react";

const StartModal = ({ start, setStart }) => {
  const modalStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#D9D9D9",
    padding: "20px",
    zIndex: 1000,
    textAlign: "center",
    borderRadius: "10px",
  };
  const [timer, setTimer] = useState(5);
  useEffect(() => {
    let countdownInterval;
    if (start) {
      countdownInterval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(countdownInterval);
          setStart(false);
        }
      }, 1000);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [timer, start]);
  if (start) {
    return (
      <div>
        <div class="overlay"></div>
        <div style={modalStyle}>
          <h1>Start In: {timer}</h1>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default StartModal;
