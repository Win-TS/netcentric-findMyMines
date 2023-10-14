import React from "react";

import Wait from "../components/Wait";
import Status from "../components/Status";

import io from "socket.io-client";
import qs from "qs";
import { Navigate } from "react-router-dom";

const ENDPOINT = "http://localhost:9000/";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null,
      playerIndex: null,
      firstPlayer: null,
      turn: true,
      end: false,
      room: "",
      statusMessage: "",
      currentPlayerScore: 0,
      opponentPlayer: [],
      selectedAvatar: null,
      opponentAvatar: null,
      streakBombs: 0,
      waiting: false,
      joinError: false,
    };
    this.socketID = null;
  }

  componentDidMount() {
    this.socket = io(ENDPOINT);
    let { room, name, difficulty, playerIndex, avatar } = qs.parse(
      window.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    this.setState({ room });
    this.setState({ playerIndex });
    if (avatar === "undefined") avatar = 'avatar1'
    this.setState({ avatar });
    console.log(avatar);
    this.socket.emit("newRoomJoin", { room, name, difficulty, avatar, playerIndex });
    this.socket.on("waiting", () =>
      this.setState({
        waiting: true,
        currentPlayerScore: 0,
        opponentPlayer: [],
      })
    );
    //gameState:revealedCells array, players:[[id1, name1], [id2, name2]], turn, 
    this.socket.on("starting", ({ gameState, players, turn, avatars }) => {
      this.setState({ waiting: false, opponentAvatar: avatars[playerIndex === 0 ? 1 : 0] });
      //this.gameStart(gameState, players, turn)
    });
    this.socket.on("joinError", () => this.setState({ joinError: true }));
    this.socket.on("setFirstPlayer", ({ firstPlayer, id }) => {
      this.setState({ firstPlayer: firstPlayer });
      this.socketID = id;
    });
    this.socket.on("update", ({ gameState, turn }) =>
      this.handleUpdate(gameState, turn)
    );
    this.socket.on("winner", ({ gameState, turn }) =>
      this.handleWin(gameState, turn)
    );
    this.socket.on("restart", ({ gameState, turn }) =>
      this.handleRestart(gameState, turn)
    );
  }

  setTurn = (turn) => {
    if (this.state.playerIndex === turn) {
      this.setState({ turn: true });
    } else {
      this.setState({ turn: false });
    }
  };

  setGame = (gameState) => {
    this.setState({ game: gameState });
  };

  gameStart = () => {
    let room = this.state.room
  }

  cellClicked = () => {
  }

  render() {
    if (this.state.joinError) {
      return <Navigate to={`/`} />;
    } else {
      return (
        <>
          <Wait display={this.state.waiting} room={this.state.room} />
          <Status message={this.state.statusMessage} />
        </>
      );
      // }
    }
  }
}
export default Game;
