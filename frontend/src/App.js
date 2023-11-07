import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnlineClients from "./components/OnlineClients";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import { Leaderboard } from "./pages/Leaderboard";
import Avatar from "./pages/Avatar";
import Admin from "./pages/Admin";
import backgroundMusic from "./assets/bgm.m4a";
import { useState } from "react";

function App() {
  const [audio] = useState(new Audio(backgroundMusic));
  const [nightTheme, setNightTheme] = useState(false);

  const playAudio = () => {
    audio.loop = true;
    audio.volume = 0.1;
    audio.play().catch((error) => {
      console.error("Autoplay failed:", error.message);
    });
  };

  const handleDayThemeClick = () => {
    setNightTheme(false);
  };

  const handleNightThemeClick = () => {
    setNightTheme(true);
  };

  return (
    <div className="App" id={`default-background-color-font${nightTheme ? '-night' : ''}`}>
      <button onClick={playAudio}>Play Background Music</button>
      <Router>
        <OnlineClients />
        <Routes>
          <Route
            path="/"
            element={
              <MainMenu
                changeDayTheme={handleDayThemeClick}
                changeNightTheme={handleNightThemeClick}
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
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h1> You are in the wrong path </h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
