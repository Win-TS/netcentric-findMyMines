import React from "react";

export default function Status({ message }) {
  return (
    <div className="status" id='kanit-font'>
      <h1 className="status-message">{message}</h1>
    </div>
  );
}
