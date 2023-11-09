import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_IP_BACK || "http://localhost:9000/";
const socket = io.connect(ENDPOINT);

const Admin = () => {
    const [onlineClients, setOnlineClients] = useState(0);

    useEffect(() => {
        socket.on("onlineClients", (count) => {
          setOnlineClients(count);
        });
    
        return () => {
          socket.off("onlineClients");
        };
      }, [onlineClients]);

    const handleReset = () => {
        return socket.emit('clearRooms');
    }

    return (
        <>
        <div>
            <h1>Admin Page</h1>
            <h3>Online Clients: {onlineClients}</h3>
            <button onClick={handleReset}>Reset All Rooms</button>
        </div>
        </>
    )

}

export default Admin;