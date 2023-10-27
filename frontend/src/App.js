import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnlineClients from "./components/OnlineClients";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import { Leaderboard } from "./pages/Leaderboard";
import Avatar from "./pages/Avatar";
import { useEffect, useState } from "react";
import backgroundMusic from "./assets/bgm.m4a"

function App() {
  const [audio] = useState(new Audio(backgroundMusic));

  const playAudio = () => {
    audio.loop = true;
    audio.volume = 0.1;
    audio.play().catch(error => {
      console.error("Autoplay failed:", error.message);
    });
  };

  return (
    <div className="App" id='default-background-color-font'>
      <button onClick={playAudio}>Play Background Music</button>
      <Router>
        <OnlineClients />
        <Routes>
          {/* might change to switch for same socket id */}
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="*" element={<h1> You are in the wrong path </h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
