import React, { useRef } from "react";
import { Navigate, Link } from "react-router-dom";

const Wait = ({ room, display }) => {
  const textArea = useRef(null);
  const onClick = () => {
    textArea.current.select();
    document.execCommand("copy");
  };

  return (
    <div className="wait" style={{ display: display ? "flex" : "none" }}>
      <div className="copy">
        <h1 className="copy-message">
          Give your friend the following room id to connect
        </h1>
        <div className="copy-container">
          <div className="copy-box">
            <div className="room-id-box">
              <label htmlFor="room" className="room-label">
                Room ID
              </label>
              <input
                ref={textArea}
                readOnly={true}
                value={room}
                className="copy-area"
              />
            </div>
            <button className="copy-button" onClick={onClick}>
              Copy
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="gray"
                  d="M21 8.94a1.31 1.31 0 0 0-.06-.27v-.09a1.07 1.07 0 0 0-.19-.28l-6-6a1.07 1.07 0 0 0-.28-.19a.32.32 0 0 0-.09 0a.88.88 0 0 0-.33-.11H10a3 3 0 0 0-3 3v1H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1h1a3 3 0 0 0 3-3V8.94Zm-6-3.53L17.59 8H16a1 1 0 0 1-1-1ZM15 19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1v7a3 3 0 0 0 3 3h5Zm4-4a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3v3a3 3 0 0 0 3 3h3Z"
                />
              </svg>
            </button>
          </div>
          <h1 className="wait-message">Waiting for player to connect...</h1>
        </div>
        <Link to="/" className="back-button">
          <button className="btn btn-lg btn-block" id="back-btn">
            <div className="backarrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <rect
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="none"
                />
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="m2.87 7.75l1.97 1.97a.75.75 0 1 1-1.06 1.06L.53 7.53L0 7l.53-.53l3.25-3.25a.75.75 0 0 1 1.06 1.06L2.87 6.25h9.88a3.25 3.25 0 0 1 0 6.5h-2a.75.75 0 0 1 0-1.5h2a1.75 1.75 0 1 0 0-3.5H2.87Z"
                  clip-rule="evenodd"
                />
              </svg>
              Back
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Wait;
