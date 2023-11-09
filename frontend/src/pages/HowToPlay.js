import bombImg from "../assets/bomb.svg";
import goldenBombImg from "../assets/goldenBomb.png";
import { Link } from "react-router-dom";

const HowToPlay = ({ nightTheme }) => {
  return (
    <div>
      <Link to="/">
        <button className={`exit${nightTheme ? "-night" : ""}`}>
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
      </Link>
      <div className={`how-to-play-container${nightTheme ? "-night" : ""}`}>
        <h1 className={`how-to-play${nightTheme ? "-night" : ""}`}>How to Play</h1>
        <p className="instructions-text">
          Here are the instructions on how to play the game:
        </p>
        <ol>
          <li>In this game, you will compete to find mines with your peer.</li>
          <li>First, choose the difficulty.</li>
          <li>Enter a game room or create a new one.</li>
          <li>
            Once in the game, a player will be randomly chosen,
            <br /> and you will each have 10 seconds per round.
          </li>
          <ul>
            <li>If you reveal a mine, you receive 1 point!</li>
            <li>If you reveal a golden mine, you receive 3 points!</li>
            <div className="mine-images">
              <img src={bombImg} alt="Bomb" className="bomb-image" />
              <img
                src={goldenBombImg}
                alt="Golden Bomb"
                className="golden-bomb-image"
              />
            </div>
            <li>
              Extra! If you find 3 streak mines, 1 bonus point will be given!
            </li>
            <li>
              At the end, the player with the highest points will be the winner.
            </li>
            <li>
              Restart button will be available, but the winner will start first!
            </li>
          </ul>
        </ol>
        <p>Hint: Try to use strategic moves to win this game!</p>
        <p className={`good-luck-text${nightTheme ? "-night" : ""}`}>Enjoy the game and good luck!</p>
      </div>
    </div>
  );
};

export default HowToPlay;
