import bombImg from "../assets/bomb.svg";
import goldenBombImg from "../assets/goldenBomb.png";

const HowToPlay = () => {
  return (
    <div className="how-to-play-container">
      <h1 className="how-to-play">How to Play</h1>
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
        <li>Try to use strategic moves to win this game!</li>
      </ol>
      <p className="good-luck-text">Enjoy the game and good luck!</p>
    </div>
  );
};

export default HowToPlay;
