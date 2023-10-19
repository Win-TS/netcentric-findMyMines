import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = ({ isActive, onTimeout }) => {
  const [timer, setTimer] = useState(10);
  const hasTimedOut = useRef(false);

  useEffect(() => {
    let countdownInterval;

    if (isActive) {
      setTimer(10);
      hasTimedOut.current = false;
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(countdownInterval);
            if (!hasTimedOut.current) {
              hasTimedOut.current = true;
              if (onTimeout) {
                onTimeout();
              }
            }
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(countdownInterval);
      setTimer(10);
      hasTimedOut.current = false;
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isActive, onTimeout]);

  return (
    <div>
      <h1>Countdown Timer: {timer}</h1>
    </div>
  );
};

export default CountdownTimer;
