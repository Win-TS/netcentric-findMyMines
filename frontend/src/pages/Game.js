import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";
import qs from "qs";

import Wait from "../components/Wait";
import Status from "../components/Status";
import GridBlock from "../components/GridBlock";
import Scoreboard from "../components/Scoreboard";
import ResultModal from "../components/ResultModal";
import ShowAvatar from "../components/ShowAvatar";
import StartModal from "../components/StartModal";
import CountdownTimer from "../components/CountdownTimer";

const ENDPOINT = "http://localhost:9000/";
const socket = io.connect(ENDPOINT);

const Game = () => {
  const [playerName, setPlayerName] = useState("");
  const [minefield, setMinefield] = useState(null);
  const [size, setSize] = useState(0);
  const [game, setGame] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [firstPlayer, setFirstPlayer] = useState(-1);
  const [turn, setTurn] = useState(true);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(false);
  const [end, setEnd] = useState(false);
  const [room, setRoom] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
  const [opponentPlayer, setOpponentPlayer] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [opponentAvatar, setOpponentAvatar] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [joinError, setJoinError] = useState(false);

  const handleClick = (row, col) => {
    if (!game[row][col] && !end && turn) {
      socket.emit("move", { room, playerIndex, row, col });
    }
  };

  const handleTimeout = () => {
    setTimer(false);
    if (!end && turn) {
      socket.emit("move", { room });
    }
  };

  const handleUpdate = (gameState, turnInd, scoreArray) => {
    setGame(gameState);
    setTurn(playerIndex === turnInd);
    setStatusMessage(
      playerIndex === turnInd ? "Your Turn" : `${opponentPlayer[0]}'s Turn`
    );
    setCurrentPlayerScore(scoreArray[playerIndex]);
    let currentOpponentPlayer = [...opponentPlayer];
    currentOpponentPlayer[1] = scoreArray[playerIndex === 0 ? 1 : 0];
    setOpponentPlayer(currentOpponentPlayer);
    setTimer(true);
  };

  const handleWin = (gameState, scoreArray) => {
    setGame(gameState);
    setCurrentPlayerScore(scoreArray[playerIndex]);
    let currentOpponentPlayer = [...opponentPlayer];
    currentOpponentPlayer[1] = scoreArray[playerIndex === 0 ? 1 : 0];
    setOpponentPlayer(currentOpponentPlayer);
    setEnd(true);
    // axios post leaderboard score
  };

  const handleRestartButton = () => {
    socket.emit("playAgainRequest", room);
  };

  const handleRestart = (gameState, turnInd, minefield) => {
    setGame(gameState);
    setEnd(false);
    setStatusMessage(
      playerIndex === turnInd ? "Your Turn" : `${opponentPlayer[0]}'s Turn`
    );
    setCurrentPlayerScore(0);
    let currentOpponentPlayer = [...opponentPlayer];
    currentOpponentPlayer[1] = 0;
    setOpponentPlayer(currentOpponentPlayer);
    setMinefield(minefield);
  };

  const renderGrid = (row, col) => {
    if (minefield) {
      let index = row * size + col;
      return (
        <GridBlock
          key={index}
          id={index}
          player={playerIndex}
          mine={minefield[row][col]}
          revealed={game[row][col]}
          size={size}
          end={end}
          turn={turn}
          onClick={handleClick}
        />
      );
    }
    return <div></div>;
  };

  useEffect(() => {
    let { room, name, difficulty, playerIndex, avatar } = qs.parse(
      window.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    playerIndex = Number(playerIndex);
    if (avatar === "undefined" || avatar === "null") avatar = "avatar1";
    setPlayerName(name);
    setRoom(room);
    setPlayerIndex(playerIndex);
    setSelectedAvatar(avatar);
    if (difficulty === "easy") {
      setSize(6);
    } else if (difficulty === "medium") {
      setSize(9);
    } else if (difficulty === "hard") {
      setSize(12);
    }
    socket.emit("newRoomJoin", {
      room,
      name,
      difficulty,
      avatar,
      playerIndex,
    });
  }, []);

  useEffect(() => {
    socket.on("waiting", () => setWaiting(true));

    socket.on(
      "starting",
      ({ minefield, gameState, players, turnInd, avatars }) => {
        setMinefield(minefield);
        setWaiting(false);
        setOpponentAvatar(avatars[playerIndex === 0 ? 1 : 0]);
        const opponent = players[playerIndex === 0 ? 1 : 0][1];
        setOpponentPlayer([opponent, 0]);
        setEnd(false);
        setGame(gameState);
        console.log(minefield);
        setTurn(playerIndex === turnInd);
        setStatusMessage(
          playerIndex === turnInd ? "Your Turn" : `${opponent}'s Turn`
        );
        setStart(true);
      }
    );

    socket.on("setFirstPlayer", ({ firstPlayer }) => {
      setFirstPlayer(firstPlayer);
    });

    socket.on("joinError", () => setJoinError(true));

    return () => {
      socket.off("waiting");
      socket.off("starting");
      socket.off("joinError");
    };
  }, [
    socket,
    selectedAvatar,
    opponentAvatar,
    minefield,
    waiting,
    playerIndex,
    start,
  ]);

  useEffect(() => {
    socket.on("update", ({ gameState, turnInd, scoreArray }) =>
      handleUpdate(gameState, turnInd, scoreArray)
    );
    socket.on("winner", ({ gameState, scoreArray }) =>
      handleWin(gameState, scoreArray)
    );
    socket.on("restart", ({ gameState, turnInd, minefield }) =>
      handleRestart(gameState, turnInd, minefield)
    );
    return () => {
      socket.off("update");
      socket.off("winner");
      socket.off("restart");
    };
  }, [statusMessage, end, game, currentPlayerScore, opponentPlayer]);

  if (joinError) {
    return <Navigate to={"/"} />;
  } else {
    const gridArray = [];
    for (let i = 0; i < size * size; i++) {
      const newGridBlock = renderGrid(Math.floor(i / size), i % size);
      gridArray.push(newGridBlock);
    }
    return (
      <>
        <div className="findmymines-text">FINDMYMINES</div>
        <StartModal start={start} setStart={setStart} />
        <Wait display={waiting} room={room} />
        <Status message={statusMessage} />
        <CountdownTimer isActive={timer} onTimeout={handleTimeout} />
        <div className="in-line-grid">
          <div>
            <Scoreboard player={playerName} playerScore={currentPlayerScore} />
            <ShowAvatar avatar={selectedAvatar} />
          </div>

          <div className={`grid-div-${size}`}>{gridArray}</div>
          <div>
            <Scoreboard
              player={opponentPlayer[0]}
              playerScore={opponentPlayer[1]}
            />
            <ShowAvatar avatar={opponentAvatar} />
          </div>
        </div>
        <ResultModal
          score={currentPlayerScore}
          opponentScore={opponentPlayer[1]}
          end={end}
          restart={handleRestartButton}
        />
      </>
    );
  }
};
export default Game;
