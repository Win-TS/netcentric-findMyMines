import React from "react";

const AvatarSelection = ({ image, selected, onClick }) => {
  const selectedClass = selected ? "selected" : "";

  const imageStyle = {
    width: "300px", // Set the desired width
    height: "300px", // Set the desired height
  };


  return (
    <div className={`avatar ${selectedClass}`} onClick={onClick}>
      <img src={image} alt="Avatar" style={imageStyle} />
    </div>
  );
};

export default AvatarSelection;
