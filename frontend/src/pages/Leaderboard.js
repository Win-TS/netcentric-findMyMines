import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/score/leaderboards",
          { crossdomain: true }
        );
        setLeaderboards(response.data.leaderboards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-gray-200 p-4 container">
      <div className="back">
        <div className="front">
          <div className="top">
            <h1 className="text-3xl font-bold mb-4 text-center text">
              LEADERBOARD
            </h1>
            <div className="trophies">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="100"
                fill="#D4492A"
                class="bi bi-trophy-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
              </svg>
              <div className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="50"
                  fill="#D4492A"
                  class="bi bi-arrow-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 grid">
                  {leaderboards.map((player, index) => (
                    <div
                      key={player._id}
                      className="bg-white shadow-md rounded p-1 player-box"
                    >
                      <h2 className="text-xl font-bold mb-2 player">
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
    </div>
  );
};
