import { Link } from "react-router-dom";
import bombImg from "../assets/bomb.svg";
import homeImg from "../assets/home.svg";

const ResultModal = ({ score, opponentScore, end, restart, nightTheme }) => {
  const modalStyle = {
    display: end ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#D9D9D9",
    padding: "20px",
    zIndex: 1000,
    textAlign: "center",
    borderRadius: "5px",
  };

  if (end) {
    return (
      <div>
        <div class={`overlay${nightTheme ? '-night' : ''}`}></div>
        <div style={modalStyle}>
          {score > opponentScore ? (
            <>
              <img src={bombImg} width="150px" height="150px" alt="bomb" />
              <h1 class={`result-modal-text${nightTheme ? '-night' : ''}`}>FINDMYMINES</h1>
              <h1 id={`you-win${nightTheme ? '-night' : ''}`}>You Win!!!</h1>
              <br />
              <button class={`restart-btn${nightTheme ? '-night' : ''}`} onClick={restart}>
                Restart
              </button>
              <br />
              <Link to="/">
                <img src={homeImg} width="50px" height="50px" alt="home" />
                <p>Go to home page</p>
              </Link>
            </>
          ) : (
            <>
              <img src={bombImg} width="150px" height="150px" alt="bomb" />
              <h1 class={`result-modal-text${nightTheme ? '-night' : ''}`}>FINDMYMINES</h1>
              <h1 id={`you-lose${nightTheme ? '-night' : ''}`}>You Lose!!!</h1>
              <br />
              <button class={`restart-btn${nightTheme ? '-night' : ''}`} onClick={restart}>
                Restart
              </button>
              <br />
              <Link to="/">
                <img src={homeImg} width="50px" height="50px" alt="home" />
                <p>Go to home page</p>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
  return <div style={{ display: "none" }}></div>;
};

export default ResultModal;
