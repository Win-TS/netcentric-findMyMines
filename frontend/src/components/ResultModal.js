const ResultModal = ({ score, opponentScore, end, restart, nightTheme }) => {
  const modalStyle = {
    display: end ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    zIndex: 1000,
    textAlign: "center",
  };

  if (end) {
    return (
      <div>
        <div className="overlay"></div>
        <div style={modalStyle}>
          {score > opponentScore ? (
            <>
              <h1>You Win!!!</h1>
              <button onClick={restart}>Restart</button>
            </>
          ) : (
            <>
              <h1>You Lose!!!</h1>
              <button onClick={restart}>Restart</button>
            </>
          )}
        </div>
      </div>
    );
  }
  return <div style={{ display: "none" }}></div>;
};

export default ResultModal;
