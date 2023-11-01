import React from "react";
import io from "socket.io-client";

import OnlineClients from "../components/OnlineClients"

const ENDPOINT = "http://localhost:9000/";
const socket = io.connect(ENDPOINT);

const Admin = () => {
    const handleReset = () => {
        return socket.emit('clearRooms');
    }

    return (
        <>
        <div>
            <h1>Admin Page</h1>
            <OnlineClients />
            <button onClick={handleReset}>Reset All Rooms</button>
        </div>
        </>
    )

}

export default Admin;