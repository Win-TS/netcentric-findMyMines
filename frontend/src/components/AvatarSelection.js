import React from "react";

const AvatarSelection = ({ image, selected, onClick }) => {
  const selectedClass = selected ? "selected" : "";

  return (
    <div className={`avatar ${selectedClass}`} onClick={onClick}>
      <img src={image} alt="Avatar" />
    </div>
  );
};

export default AvatarSelection;
