import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import { Leaderboard } from "./pages/Leaderboard";
import Avatar from "./pages/Avatar";
import Admin from "./pages/Admin";
import backgroundMusic from "./assets/bgm.m4a";
import { useState } from "react";
import HowToPlay from "./pages/HowToPlay";

function App() {
  const [audio] = useState(new Audio(backgroundMusic));
  const [isMuted, setIsMuted] = useState(false);
  const [nightTheme, setNightTheme] = useState(false);

  const playAudio = () => {
    audio.loop = true;
    audio.volume = 0.1;
    audio.play().catch((error) => {
      console.error("Autoplay failed:", error.message);
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    audio.muted = !audio.muted;
  };

  const handleDayThemeClick = () => {
    setNightTheme(false);
  };

  const handleNightThemeClick = () => {
    setNightTheme(true);
  };

  return (
    <div
      className="App"
      id={`default-background-color-font${nightTheme ? "-night" : ""}`}
    >
      <Router>
        <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
        <Routes>
          <Route
            path="/"
            element={
              <MainMenu
                changeDayTheme={handleDayThemeClick}
                changeNightTheme={handleNightThemeClick}
                playBgm={playAudio}
                nightTheme={nightTheme}
              />
            }
          />
          <Route path="/game" element={<Game nightTheme={nightTheme} />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard nightTheme={nightTheme} />}
          />
          <Route path="/avatar" element={<Avatar nightTheme={nightTheme} />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h1> You are in the wrong path </h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
