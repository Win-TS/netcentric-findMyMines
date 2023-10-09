import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OnlineClients from './components/OnlineClients';
import { MainMenu } from './pages/MainMenu';
import { Game } from "./pages/Game"
import { Leaderboard } from "./pages/Leaderboard"
import { Avatar } from "./pages/Avatar"

function App() {
  return (
    <div className="App">
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