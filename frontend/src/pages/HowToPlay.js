import bombImg from "../assets/bomb.svg";
import goldenBombImg from "../assets/goldenBomb.png";

const HowToPlay = () => {
  return (
    <div className="howtoplay-container">
      <h1>How to Play</h1>
      <p>Here are the instructions on how to play the game:</p>
      <ol>
        <li>
          In this game, you will have to compete to find mines with your peer.
        </li>
        <li>First, choose the difficulty.</li>
        <li>Enter a game room, or create a new one.</li>
        <li>
          Once in the game, player will be randomly start and you will each have
          10 secs per round
        </li>
        <ul>
          <li>If you reveal a mine, you receive 1 point!</li>
          <li>If you reveal a golden mine, you receive 3 points!</li>
          <img src={bombImg} width="60px" height="60px" />
          <img src={goldenBombImg} width="50px" height="50px" />
          <li>
            Extra! If you find 3 streak mines, 1 bonus point will be given!
          </li>
          <li>At the end, player with the highest points will be winner.</li>
          <li>Restart button will be on; but winner will start first!</li>
        </ul>
        <li>Try to use strategic move to win this game!</li>
      </ol>
      <p>Enjoy the game and good luck!</p>
    </div>
  );
};

export default HowToPlay;
