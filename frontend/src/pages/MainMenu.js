import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";

import InputForm from "../components/InputForm";
import Choice from "../components/Choice";
import Loading from "../components/Loading";
import Error from "../components/Error";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:9000/";

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      name: "",
      newGame: null,
      room: "",
      difficulty: "",
      playerIndex: 0,
      loading: false,
      serverConfirmed: false,
      error: false,
      errorMessage: "",
    };
  }

  componentDidMount = () => {
    this.socket = io(ENDPOINT);
    this.socket.on("newGameCreated", ({ room, difficulty }) => {
      this.setState({ serverConfirmed: true, room: room });
    });
    this.socket.on("joinConfirmed", ({ difficulty }) => {
      this.setState({
        serverConfirmed: true,
        difficulty: difficulty,
        playerIndex: 1,
      });
    });
    this.socket.on("errorMessage", (message) => this.displayError(message));
  };

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onChoice = (choice) => {
    const gameChoice = choice === "new" ? true : false;
    const newState = { newGame: gameChoice };
    this.setState(newState, () => {
      this.stepForward();
    });
  };

  validateNew = () => {
    if (this.state.newGame) {
      return !(this.state.name === "" || this.state.difficulty === "");
    } else {
      return (
        !(this.state.name === "") &&
        !(this.state.room === "") &&
        !(this.state.difficulty === "")
      );
    }
  };

  validateJoin = () => {
    if (this.state.newGame) {
      return !(this.state.name === "");
    } else {
      return !(this.state.name === "") && !(this.state.room === "");
    }
  };

  onSubmit = () => {
    this.setState({ loading: true });
    if (this.state.newGame && this.validateNew()) {
      this.socket.emit("newGame", { difficulty: this.state.difficulty });
    } else if (this.state.newGame === false && this.validateJoin()) {
      console.log(this.state.room);
      this.socket.emit("joining", { room: this.state.room });
    } else {
      setTimeout(() => this.setState({ loading: false }), 500);
      this.displayError(
        this.state.newGame
          ? "Please fill out your name and select difficulty"
          : "Please fill out your name, room id, and select difficulty"
      );
    }
  };

  setDifficulty = (diff) => {
    this.setState({ difficulty: diff });
  };

  stepBack = () => {
    this.setState({ step: this.state.step - 1 });
  };

  stepForward = () => {
    this.setState({ step: this.state.step + 1 });
  };

  onTyping = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    const newState = { [target]: value };
    this.setState(newState);
  };

  displayError = (message) => {
    this.setState({ error: true, errorMessage: message, loading: false });
    setTimeout(() => {
      this.setState({ error: false, errorMessage: "" });
    }, 3000);
  };

  render() {
    if (this.state.serverConfirmed) {
      return (
        <Navigate
          to={`/game?room=${this.state.room}&name=${this.state.name}&difficulty=${this.state.difficulty}&playerIndex=${this.state.playerIndex}`}
        />
      );
    } else {
      switch (this.state.step) {
        case 1:
          return (
            <>
              <Choice onChoice={this.onChoice} />
              <Link to="/leaderboard">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  id="leaderboard-btn"
                >
                  LEADERBOARD
                </button>
              </Link>
              <Link to="/avatar">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  id="avatar-btn"
                >
                  AVATAR
                </button>
              </Link>
            </>
          );
        case 2:
          return (
            <>
              <Loading loading={this.state.loading} />
              <Error
                display={this.state.error}
                message={this.state.errorMessage}
              />
              <InputForm
                stepBack={this.stepBack}
                onSubmit={this.onSubmit}
                onTyping={this.onTyping.bind(this)}
                newGame={this.state.newGame}
                name={this.state.name}
                setDifficulty={this.setDifficulty}
                room={this.state.room}
              />
            </>
          );
        default:
          return null;
      }
    }
  }
}

export default MainMenu;
