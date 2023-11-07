import React from "react";

export default function Status({ message, nightTheme }) {
  return (
    <div className={`status${nightTheme ? '-night' : ''}`} id='kanit-font'>
      <h1 className={`status-message${nightTheme ? '-night' : ''}`}>{message}</h1>
    </div>
  );
}
