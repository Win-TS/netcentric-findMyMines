import React from "react";
import { useState, useEffect } from "react";

const StartModal = ({ start, setStart }) => {
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
        <h1>Start In: {timer}</h1>
      </div>
    );
  }
  return <div></div>;
};

export default StartModal;
