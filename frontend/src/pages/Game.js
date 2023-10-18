// import React from "react";

// import Wait from "../components/Wait";
// import Status from "../components/Status";
// import GridEasy from "../components/GridEasy";

// import io from "socket.io-client";
// import qs from "qs";
// import { Navigate } from "react-router-dom";

// const ENDPOINT = "http://localhost:9000/";
//const socket = io(ENDPOINT);

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       minefield: null,
//       grid: null,
//       playerIndex: null,
//       firstPlayer: null,
//       turn: true,
//       end: false,
//       room: "",
//       statusMessage: "",
//       currentPlayerScore: 0,
//       opponentPlayer: [],
//       selectedAvatar: null,
//       opponentAvatar: null,
//       streakBombs: 0,
//       waiting: false,
//       joinError: false,
//     };
//   }

//   componentDidMount() {
//     this.socket = io(ENDPOINT);
//     let { room, name, difficulty, playerIndex, avatar } = qs.parse(
//       window.location.search,
//       {
//         ignoreQueryPrefix: true,
//       }
//     );
//     this.setState({ room });
//     this.setState({ playerIndex });
//     if (avatar === "undefined") avatar = "avatar1";
//     this.setState({ selectedAvatar: avatar });
//     this.socket.emit("newRoomJoin", {
//       room,
//       name,
//       difficulty,
//       avatar,
//       playerIndex,
//     });
//     this.socket.on("waiting", () =>
//       this.setState({
//         waiting: true,
//         currentPlayerScore: 0,
//         opponentPlayer: [],
//       })
//     );
//     //gameState:revealedCells array, players:[[id1, name1], [id2, name2]], turn,
//     this.socket.on("starting", ({ minefield, gameState, players, turn, avatars }) => {
//       this.setState({
//         minefield: minefield,
//         waiting: false,
//         opponentAvatar: avatars[playerIndex === 0 ? 1 : 0],
//       });
//       this.gameStart(gameState, players, turn);
//       console.log(gameState, players, turn, this.state.selectedAvatar ,this.state.opponentAvatar);
//       console.log(minefield);
//     });
//     this.socket.on("joinError", () => this.setState({ joinError: true }));
//     this.socket.on("setFirstPlayer", ({ firstPlayer }) => {
//       this.setState({ firstPlayer: firstPlayer });
//     });
//     this.socket.on("update", ({ gameState, turn }) =>
//       this.handleUpdate(gameState, turn)
//     );
//     this.socket.on("winner", ({ gameState, turn }) =>
//       this.handleWin(gameState, turn)
//     );
//     this.socket.on("restart", ({ gameState, turn }) =>
//       this.handleRestart(gameState, turn)
//     );
//   }

//   setTurn = (turn) => {
//     this.setState({ turn: this.state.playerIndex === turn });
//   };

//   setGame = (gameState) => {
//     this.setState({ game: gameState });
//   };

//   setMessage() {
//     const message = this.state.turn
//       ? "Your Turn"
//       : `${this.state.opponentPlayer[0]}'s Turn`;
//     this.setState({ statusMessage: message });
//   }

//   gameStart = (gameState, players, turn) => {
//     const opponent = players[this.state.playerIndex === 0 ? 1 : 0][1];
//     this.setState({ opponentPlayer: [opponent, 0], end: false });
//     this.setGame(gameState);
//     this.setTurn(turn);
//     this.setMessage();
//   };

//   handleClick = (row, col) => {
//     const { grid, end, turn, room, playerIndex } = this.state;
//     if (!grid[row][col] && !end && turn) {
//       this.socket.emit("move", { room, playerIndex, row, col });
//     }
//   };

//   cellClicked = (row, col) => {
//     if (this.state.turn && !this.state.end) {
//       this.socket.emit("move", {
//         room: this.state.room,
//         player: this.state.playerIndex,
//         row,
//         col,
//       });
//     }
//   };

//   handleUpdate = (gameState, turn) => {
//     this.setGame(gameState);
//     this.setTurn(turn);
//     this.setMessage();
//   };

//   renderGrid = () => {
//     if (this.state.minefield) {
//       return(
//         <GridEasy minefield={this.state.minefield} handleClick={this.handleClick}/>
//       );
//     }
//     return <div></div>;
//   }

//   render = () => {
//     if (this.state.joinError) {
//       return <Navigate to={`/`} />;
//     } else {
//       return (
//         <>
//           <Wait display={this.state.waiting} room={this.state.room} />
//           <Status message={this.state.statusMessage} />
//           <div>
//             {this.renderGrid()}
//           </div>
//         </>
//       );
//       // }
//     }
//   }
// }
// export default Game;

import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";
import qs from "qs";
//import '../App.css'

import Wait from "../components/Wait";
import Status from "../components/Status";
import GridBlock from "../components/GridBlock";
import Scoreboard from "../components/Scoreboard";
import ResultModal from "../components/ResultModal";
import ShowAvatar from "../components/ShowAvatar";
import avatar1 from "../assets/avatar1.png";

const ENDPOINT = "http://localhost:9000/";
const socket = io.connect(ENDPOINT);

const Game = () => {
  const [playerName, setPlayerName] = useState("");
  const [minefield, setMinefield] = useState(null);
  const [size, setSize] = useState(0);
  const [numMines, setNumMines] = useState(0);
  const [game, setGame] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(-1);
  const [firstPlayer, setFirstPlayer] = useState(-1);
  const [turn, setTurn] = useState(true);
  const [end, setEnd] = useState(false);
  const [room, setRoom] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [currentPlayerScore, setCurrentPlayerScore] = useState(0);
  const [opponentPlayer, setOpponentPlayer] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [opponentAvatar, setOpponentAvatar] = useState(null);
  const [streakBombs, setStreakBombs] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [joinError, setJoinError] = useState(false);

  const handleClick = (row, col) => {
    if (!game[row][col] && !end && turn) {
      socket.emit("move", { room, playerIndex, row, col });
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
  };

  const handleWin = (gameState, scoreArray) => {
    setGame(gameState);
    setCurrentPlayerScore(scoreArray[playerIndex]);
    let currentOpponentPlayer = [...opponentPlayer];
    currentOpponentPlayer[1] = scoreArray[playerIndex === 0 ? 1 : 0];
    setOpponentPlayer(currentOpponentPlayer);
    setEnd(true);
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
    let { room, name, difficulty, playerInd, avatar } = qs.parse(
      window.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    playerInd = Number(playerInd);
    if (avatar === "undefined") avatar = "avatar1";
    setPlayerName(name);
    setRoom(room);
    setPlayerIndex(playerInd);
    setSelectedAvatar(avatar);
    if (difficulty === "easy") {
      setSize(6);
      setNumMines(11);
    } else if (difficulty === "medium") {
      setSize(9);
      setNumMines(25);
    } else if (difficulty === "hard") {
      setSize(12);
      setNumMines(43);
    }
    socket.emit("newRoomJoin", {
      room,
      name,
      difficulty,
      avatar,
      playerInd,
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
        console.log(opponentAvatar);
        setTurn(playerIndex === turnInd);
        setStatusMessage(
          playerIndex === turnInd ? "Your Turn" : `${opponent}'s Turn`
        );
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
  }, [socket, selectedAvatar, opponentAvatar, minefield, waiting, playerIndex]);

  useEffect(() => {
    socket.on("update", ({ gameState, turnInd, scoreArray }) =>
      handleUpdate(gameState, turnInd, scoreArray)
    );
    socket.on("winner", ({ gameState, scoreArray }) =>
      handleWin(gameState, scoreArray)
    );
    socket.on("restart", ({ gameState, turnInd }) =>
      this.handleRestart(gameState, turnInd)
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
        <Wait display={waiting} room={room} />
        <Status message={statusMessage} />
        <Scoreboard
          player={playerName}
          playerScore={currentPlayerScore}
          opponent={opponentPlayer[0]}
          opponentScore={opponentPlayer[1]}
        />
        <ShowAvatar avatar={selectedAvatar}/>
        <ShowAvatar avatar={opponentAvatar}/>
        <ResultModal
          score={currentPlayerScore}
          opponentScore={opponentPlayer[1]}
          end={end}
        />
        <div className={`grid-div-${size}`}>{gridArray}</div>
      </>
    );
  }
};
export default Game;
