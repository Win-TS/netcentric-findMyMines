import React from "react";

const AvatarSelection = ({ image, selected, onClick }) => {
  const selectedClass = selected ? "selected" : "";

  const imageStyle = {
    width: "300px",
    height: "300px"
  };

  return (
    <div className={`avatar ${selectedClass}`} onClick={onClick}>
      <img src={image} alt="Avatar" style={imageStyle} />
    </div>
  );
};

export default AvatarSelection;
