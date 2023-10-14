import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarSelection from "../components/AvatarSelection";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import avatar6 from "../assets/avatar6.png";
import avatar7 from "../assets/avatar7.png";
import avatar8 from "../assets/avatar8.png";

const Avatar = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const navigate = useNavigate();

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    console.log(selectedAvatar);
  };

  return (
    <div className="avatar-selection-page">
      <h1>Select Your Avatar</h1>
      <div className="avatar-container">
        <AvatarSelection
          image={avatar1}
          selected={selectedAvatar === avatar1}
          onClick={() => handleAvatarClick("avatar1")}
        />
        <AvatarSelection
          image={avatar2}
          selected={selectedAvatar === avatar2}
          onClick={() => handleAvatarClick("avatar2")}
        />
        <AvatarSelection
          image={avatar3}
          selected={selectedAvatar === avatar3}
          onClick={() => handleAvatarClick("avatar3")}
        />
        <AvatarSelection
          image={avatar4}
          selected={selectedAvatar === avatar4}
          onClick={() => handleAvatarClick("avatar4")}
        />
        <AvatarSelection
          image={avatar5}
          selected={selectedAvatar === avatar5}
          onClick={() => handleAvatarClick("avatar5")}
        />
        <AvatarSelection
          image={avatar6}
          selected={selectedAvatar === avatar6}
          onClick={() => handleAvatarClick("avatar6")}
        />
        <AvatarSelection
          image={avatar7}
          selected={selectedAvatar === avatar7}
          onClick={() => handleAvatarClick("avatar7")}
        />
        <AvatarSelection
          image={avatar8}
          selected={selectedAvatar === avatar8}
          onClick={() => handleAvatarClick("avatar8")}
        />
      </div>
      <Link to={`/?selectedAvatar=${selectedAvatar}`}>
        <button className="btn btn-primary btn-lg btn-block" id="mainmenu-btn">
          MAINMENU
        </button>
      </Link>
    </div>
  );
};

export default Avatar;
