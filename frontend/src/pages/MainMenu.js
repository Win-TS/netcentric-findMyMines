import { useState, useEffect } from 'react';
import { usePlayerName } from '../hooks/socketHooks';

export const MainMenu = () => {
  const { playerName, setPlayerName, sendPlayerName } = usePlayerName();
  const [roomNo, setRoomNo] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Room No."
        onChange={(event) => setRoomNo(event.target.value)}
      />
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
      />
      <button onClick={() => sendPlayerName(roomNo, playerName)}>Start Game</button>
    </div>
  );
};
