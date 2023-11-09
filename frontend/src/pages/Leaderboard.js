import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const Leaderboard = ({ nightTheme }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_IP_BACK || "http://localhost:9000"}/score/leaderboards`,
          { params: { difficulty } },
          { crossdomain: true }
        );
        setLeaderboards(response.data.leaderboards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [difficulty]);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className={`container${nightTheme ? '-night' : ''}`}>
      <Link to="/">
        <button className={`exit${nightTheme ? '-night' : ''}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 20 20"
          >
            <path
              fill="#f24e1e"
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
            />
          </svg>
        </button>
        <div className={`diff-btn${nightTheme ? '-night' : ''}`}>
          <button
            className={`py-2 px-4 rounded mx-2 ez${
              difficulty === "easy" ? "bg-primary" : "", nightTheme ? '-night' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleDifficultyChange("easy");
            }}
          >
            EASY
          </button>
          <button
            className={`py-2 px-4 rounded mx-2 md${
              difficulty === "medium" ? "bg-primary" : "", nightTheme ? '-night' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleDifficultyChange("medium");
            }}
          >
            MEDIUM
          </button>
          <button
            className={`py-2 px-4 rounded mx-2  hd${
              difficulty === "hard" ? "bg-primary" : "" , nightTheme ? '-night' : ''
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleDifficultyChange("hard");
            }}
          >
            HARD
          </button>
        </div>
      </Link>
      <div className={`back${nightTheme ? '-night' : ''}`}>
        <div className={`front${nightTheme ? '-night' : ''}`}>
          <div className={`top${nightTheme ? '-night' : ''}`}>
            <h1 className={`text${nightTheme ? '-night' : ''}`}>LEADERBOARD</h1>
            <div className={`trophies${nightTheme ? '-night' : ''}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="140"
                height="140"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#f24e1e"
                  d="M256 24.99c-25 0-47.7 2.03-63.6 5.15c-6.2 1.23-11 2.65-14.7 4.01c3.7 1.36 8.5 2.78 14.7 4.01c15.9 3.12 38.6 5.15 63.6 5.15s47.7-2.03 63.6-5.15c6.2-1.23 11-2.65 14.7-4.01c-3.7-1.36-8.5-2.78-14.7-4.01c-15.9-3.12-38.6-5.15-63.6-5.15zM155.2 30.3c-19.1 8.9-29.4 26.02-26.8 43.08c2 12.32 10.9 23.51 25 29.32c8.1 3.4 17.9 5.2 29.4 5.1c13.3 24.7 31.3 45.1 50.6 54.6v43.9c-17 10.3-28.3 31.7-39.4 53.7c38.8 9.9 85.3 9.4 123.9-.1c-11-22-22.4-43.3-39.3-53.6v-43.9c19.3-9.5 37.3-29.9 50.6-54.6c11.5.1 21.3-1.7 29.4-5.1c14.1-5.81 23-17 25-29.32c2.6-17.06-7.7-34.18-26.8-43.08c.4 1.2.6 2.48.6 3.85c0 4.35-2.3 7.91-4.7 10.15c-2.3 2.24-4.9 3.73-7.8 5.08c-5.8 2.7-13.1 4.72-21.9 6.44c-17.5 3.46-41 5.49-67 5.49s-49.5-2.03-67-5.49c-8.8-1.72-16.1-3.74-21.9-6.44c-2.9-1.35-5.5-2.84-7.8-5.08c-2.4-2.24-4.7-5.8-4.7-10.15c0-1.37.2-2.65.6-3.85zm6.6 16.31c2.3 14.34 6.5 28.91 12.3 42.74c-5.6-.55-10.1-1.71-13.8-3.24c-9.4-3.9-13.2-9.63-14.1-15.51c-1.2-7.93 3.3-18.15 15.6-23.99zm188.4 0c12.3 5.84 16.8 16.06 15.6 23.99c-.9 5.88-4.7 11.61-14.1 15.51c-3.7 1.53-8.2 2.69-13.8 3.24c5.8-13.83 10-28.4 12.3-42.74zM256 278L95.98 358L224 342l-32 144h128l-32-144l128 16l-160-80z"
                />
              </svg>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 grid${nightTheme ? '-night' : ''}`}>
                {leaderboards.map((player, index) => (
                  <div
                    key={player._id}
                    className={`bg-white shadow-md rounded p-1 player-box${nightTheme ? "-night" : ''}`}>
                    {index < 3 && ( // Check if rank is 1, 2, or 3
                      <div className="star">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="80"
                          height="80"
                          viewBox="0 0 512 512"
                        >
                          <g transform="rotate(180 256 256)">
                            <path
                              fill="#FF6D60"
                              d="M394 480a16 16 0 0 1-9.39-3L256 383.76L127.39 477a16 16 0 0 1-24.55-18.08L153 310.35L23 221.2a16 16 0 0 1 9-29.2h160.38l48.4-148.95a16 16 0 0 1 30.44 0l48.4 149H480a16 16 0 0 1 9.05 29.2L359 310.35l50.13 148.53A16 16 0 0 1 394 480Z"
                            />
                          </g>
                        </svg>
                      </div>
                    )}
                    {index < 3 && (
                      <div className="star-number">{index + 1}</div>
                    )}
                    <h2 className={`player${nightTheme ? '-night' : ''}`}>
                      {player.name} #{index + 1}
                    </h2>
                    <p className="mb-1 score">
                      <strong>Score:</strong> {player.score} pts
                    </p>
                    <p>
                      <strong>Time:</strong> {player.time} ms
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
