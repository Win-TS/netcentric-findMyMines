import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:9000');

// check online clients
export const useOnlineClients = () => {
  const [onlineClients, setOnlineClients] = useState(0);

  useEffect(() => {
    socket.on('onlineClients', (count) => {
      setOnlineClients(count);
    });

    return () => {
      socket.off('onlineClients');
    };
  }, []);

  return onlineClients;
};

// check room number and status
export const usePlayerName = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerNameReceived, setPlayerNameReceived] = useState("");

  const sendPlayerName = (roomNo, playerName, difficulty) => {
    socket.emit("sendPlayerName", { playerName, roomNo, difficulty });
  };

  useEffect(() => {
    socket.on("roomFull", message => {
        alert(message);
    })

    socket.on("receivePlayerName", (data) => {
      setPlayerNameReceived(data.playerName);
    });

    return () => {
      socket.off("receivePlayerName");
    };
  }, []);

  return { playerName, setPlayerName, playerNameReceived, sendPlayerName };
};