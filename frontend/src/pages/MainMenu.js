import { useState, useEffect } from 'react';
import { usePlayerName } from '../hooks/socketHooks';
import { Link } from 'react-router-dom';
import DifficultyModal from '../components/DifficultyModal';
import axios from 'axios';

export const MainMenu = () => {
  const { playerName, setPlayerName, sendPlayerName } = usePlayerName();
  const [roomExist, setRoomExist]  = useState(false);
  const [roomNo, setRoomNo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDifficultySelect = (selectedDifficulty) => {
    sendPlayerName(roomNo, playerName, selectedDifficulty);
  };

  const handleStartGame = (event) => {
    event.preventDefault();
    if (!roomExist) {
      setShowModal(true);
    } else {
      sendPlayerName(roomNo, playerName, null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/checkRoomExist?roomNo=${roomNo}`, { crossdomain: true });
        setRoomExist(response.data.fetchRoomExist ? true : false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [roomNo]);
  
  return (
    <div className='mainmenu-container'>
      <div>
        <img className='bomg-img' src="https://api.iconify.design/noto/bomb.svg" alt="bomb" height='200px' width='200px'></img>
        <p id='findmymines-text'>FINDMYMINES</p>
      </div>
      <div>
        <form>
          <input
            className='start-page-form'
            type="text"
            placeholder="Room No."
            onChange={(event) => setRoomNo(event.target.value)}
          />
          <input
            className='start-page-form'
            type="text"
            placeholder="Player Name"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
        </form>
      </div>
      <div><p className='theme-select-text'>Select Your Theme</p></div>
        <div className='theme-select-grid'>
          <div>
            <div><img className='sun-img' src='https://api.iconify.design/noto/sun.svg' alt='sun' height='100px' width='100px'></img></div>
              <div><button className='btn btn-primary day-night-btn'>Day</button></div>
                </div>
                <div>
                <div><img className='moon-img' src='https://api.iconify.design/fxemoji/crescentmoon.svg' alt='moon' height='100px' width='100px'></img></div>
              <div><button className='btn btn-primary day-night-btn'>Night</button></div>
          </div>
        </div>
      <div>
        <button onClick={handleStartGame}>Start Game</button>
        {showModal && <DifficultyModal onSelectDifficulty={handleDifficultySelect} />}
        <Link to='/leaderboard'>
          <button className="btn btn-primary btn-lg btn-block" id="leaderboard-btn">LEADERBOARD</button>
        </Link>
      </div>
    </div>
  );
};