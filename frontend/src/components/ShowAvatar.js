import React from "react";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import avatar6 from "../assets/avatar6.png";
import avatar7 from "../assets/avatar7.png";
import avatar8 from "../assets/avatar8.png";

const ShowAvatar = ({avatar}) =>{
    switch(avatar){
        case "avatar1" : return <img src={avatar1} alt="Avatar1"></img>
        case "avatar2" : return <img src={avatar2} alt="Avatar2"></img>
        case "avatar3" : return <img src={avatar3} alt="Avatar3"></img>
        case "avatar4" : return <img src={avatar4} alt="Avatar4"></img>
        case "avatar5" : return <img src={avatar5} alt="Avatar5"></img>
        case "avatar6" : return <img src={avatar6} alt="Avatar6"></img>
        case "avatar7" : return <img src={avatar7} alt="Avatar7"></img>
        case "avatar8" : return <img src={avatar8} alt="Avatar8"></img>
    }

}

export default ShowAvatar;