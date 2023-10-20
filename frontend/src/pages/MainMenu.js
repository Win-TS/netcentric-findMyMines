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
            <div className = "mainmenu-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 128 128"><path fill="#FFE36C" d="m81.13 29.99l-18.34.18l15.68-8.55l-3.71-13.24l10.41 7.9l10.47-8.01l-2.75 10.78l17.26 1.98l-17.96 7l-7.16 12.5z"/><path fill="#FF8F00" d="m92.27 13.37l-.76 2.96l-1.13 4.45l4.56.52l6.94.79l-9.76 3.81l-1.32.51l-.7 1.23l-4.68 8.17l-1.92-5.2l-.98-2.65l-2.82.04l-8.91.09l7.24-3.95l2.8-1.53l-.86-3.07l-1.67-5.96l4.44 3.37l2.43 1.84l2.42-1.85l4.68-3.57m-7.11.39L72.49 4.15c-.41-.31-.98.08-.84.57l4.46 15.91l-19.44 10.6c-.49.27-.3 1.01.26 1L79.74 32l4.5 12.17c.16.43.74.47.97.08l8.37-14.62l22.82-8.9c.52-.2.42-.97-.13-1.03L95.4 17.32l3.22-12.65c.13-.49-.44-.87-.84-.56l-12.62 9.65z"/><path fill="#4D4D4D" d="M94.59 44.29c-1.27-.18-7.6 6.13-12.17 2.17l-.01.01a43.674 43.674 0 0 0-8.72-5.51c-21.75-10.37-47.8-1.15-58.18 20.61c-10.37 21.75-1.15 47.8 20.61 58.18c21.75 10.37 47.8 1.15 58.18-20.61c3.37-7.06 4.67-14.57 4.14-21.85c-.04-.51-.13-1.64.12-2.48c1.71-5.74 7.93-8.6 7.8-8.87c-.13-.28-10.49-21.47-11.77-21.65z"/><ellipse cx="100.46" cy="55.12" fill="#757575" rx="5.83" ry="12.33" transform="rotate(-29.923 100.447 55.121)"/><ellipse cx="102.35" cy="55.1" fill="#212121" rx="2.29" ry="3.52" transform="rotate(-30 102.345 55.102)"/><path fill="#757575" d="M53.9 52.57c2.74 7.78-1.27 12.42-6.46 15.39c-2.48 1.42-5.36 2.04-7.87 3.41c-4.88 2.66-7.84 7.79-12.09 11.36c-1.06.89-2.27 1.71-3.65 1.86c-1.84.2-3.64-.88-4.74-2.37c-1.09-1.5-5.56-15.72 10.76-30.27c7.29-6.5 21.05-7.91 24.05.62z" opacity=".9"/><linearGradient id="notoBomb0" x1="42.079" x2="83.812" y1="34.552" y2="48.063" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFF9C4" stop-opacity=".1"/><stop offset=".002" stop-color="#FFF9C4" stop-opacity=".101"/><stop offset=".378" stop-color="#FFFCA6" stop-opacity=".263"/><stop offset=".701" stop-color="#FFFE94" stop-opacity=".401"/><stop offset=".93" stop-color="#FFFF8D" stop-opacity=".5"/></linearGradient><path fill="url(#notoBomb0)" d="M41.86 38.72c3.69.12 11.23.17 20.77 3.92c3.21 1.26 5.92 3.02 8.83 4.82c2.35 1.45 5.02 2.66 7.77 2.4c.97-.09 2.04-.47 2.42-1.37c.23-.56.21-1.13.01-1.69c-.24-.66-1.06-1.58-2.32-2.61a44.392 44.392 0 0 0-5.64-3.23c-10.36-4.94-21.69-5.43-31.84-2.24z"/><linearGradient id="notoBomb1" x1="102.029" x2="91.139" y1="57.302" y2="42.935" gradientUnits="userSpaceOnUse"><stop offset=".11" stop-color="#FFF9C4" stop-opacity="0"/><stop offset="1" stop-color="#FFFF8D"/></linearGradient><path fill="url(#notoBomb1)" d="M102.13 47.64c-.05-.05-.1-.11-.15-.16c-.01-.01-.01-.02-.02-.02c-.23-.23-.46-.45-.69-.67c-.03-.03-.07-.06-.1-.1c-2.53-2.29-5.12-3.26-6.86-2.27c-2.79 1.6-2.3 7.69 1.1 13.59a25.56 25.56 0 0 0 2.37 3.43c-.1-.29-3.84-11.52-1.51-14.53c1.99-2.54 5.51.43 5.86.73z"/><path fill="#212121" d="M88.16 74.53c-2.42-1.59-4.79-3.75-6.26-9.18c-.19-.69-.83-4.12 1.02-4.67c1.6-.48 2.79 2.15 4.17 4.46c1.5 2.53 3.93 4.72 6.54 6.15c.76.41 4.29 2 1.97 4.22c-1.53 1.45-6.02-.04-7.44-.98z"/><path fill="#C69461" d="M100.85 53.44c.1-.04 10.25-4.65 9.37-11.34c-.58-4.42-2.3-6.62-11.4-8.78c-8.9-2.11-13.25-6.24-13.43-6.42c-.89-.86-.92-2.29-.05-3.19c.86-.89 2.28-.92 3.18-.06c.07.06 3.77 3.48 11.35 5.28c8.82 2.09 13.79 4.72 14.83 12.57c1.16 8.78-8.52 14.25-11.29 15.7c-1.72.91-3.7-3.26-2.56-3.76z"/><path fill="#F6BC41" d="M88.5 23.66c-.89-.86-2.32-.83-3.18.06c-.86.9-.84 2.32.05 3.19c.13.13 2.5 2.37 7.25 4.39l.95-1.66l3.66-1.43c-5.81-1.86-8.67-4.5-8.73-4.55z"/></svg>
              <div className = "maintitle"><h1>FINDMYMINES</h1></div>
              <div className = "theme"><h2>Select your Theme</h2></div>
              <div className = "daynight">
                <div className = "theme-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 128 128"><path fill="#FCC11A" d="M37.41 41.95c-9.71 12.48-9.54 34.65 2.87 45.64c14.09 12.47 33.92 12.34 46.39.87c14.95-13.76 14.09-36.66.87-49.63c-13.29-13.04-37.04-13.72-50.13 3.12z"/><path fill="#FEE269" d="M53 37.67c-3.84-1.7-8.04 2.93-9.87 6.09c-1.83 3.17-3.53 9.38.37 10.97c3.9 1.58 6.7-1.1 9.51-5.73c2.79-4.63 4.38-9.38-.01-11.33z"/><path fill="#FFA722" d="M63 20.27c-.93 1.74-.62 3.08 1.23 3.52c1.85.44 13.36 2.31 14.33 2.37c1.41.09 1.93-.97 1.76-2.2c-.18-1.23-2.99-18.46-3.25-20.04S75.14.76 73.55 2.87S63.7 18.96 63 20.27zm29.8 11.96c-1.81.56-1.76 1.67-.79 3.08c.97 1.41 7.65 11.6 8.26 12.31c.62.7 1.67.88 2.55-.18c.88-1.05 11.86-16.45 12.66-17.41c1.32-1.58.53-3.25-1.49-2.73c-1.54.41-20.05 4.58-21.19 4.93zm13.8 29.63c-1.3-.74-2.99-.53-3.43 1.14c-.44 1.67-2.37 13.8-2.55 14.86s.62 2.11 1.93 1.85s19.45-2.95 20.66-3.25c2.11-.53 2.81-2.64.62-4.22c-1.42-1.03-16-9.68-17.23-10.38zM92.09 90.6c1.4-.75 2.64-.18 2.99 1.41c.35 1.58 4.22 17.76 4.84 20.75c.31 1.5-1.41 2.73-2.81 1.85c-1.41-.88-16.69-11.53-17.67-12.4c-1.41-1.23-.43-2.51.26-3.16c1.4-1.33 11.07-7.74 12.39-8.45zm-42.55 8.88c-1.77-.17-2.29 1.41-2.02 2.81c.26 1.41 2.9 19.24 3.08 20.57c.26 1.93 2.29 2.73 3.6.79s10.35-16.4 11.08-17.76c1.32-2.46.35-2.99-.97-3.6c-1.31-.61-12.92-2.63-14.77-2.81zM24.23 79c1.23-2.02 2.81-1.49 3.96.44c.78 1.32 7.38 10.2 8 11.16c.62.97.88 2.81-1.05 3.25c-1.95.45-17.68 4.58-20.14 5.02c-2.46.44-3.87-1.49-2.29-3.6c.92-1.24 10.82-15.12 11.52-16.27zm-3.34-15.3c2.25 1 3.31.64 3.78-.97c.62-2.11 2.46-11.78 2.55-13.98c.06-1.43-.53-2.81-2.73-2.46S6.47 48.85 4.45 49.55c-2.35.82-2.18 3.4-.62 4.22c1.85.97 15.47 9.23 17.06 9.93zm27.34-36.92c1.27-1.01.88-2.46-.26-3.25c-1.14-.79-15.26-11-17.05-12.4c-1.58-1.23-3.52-.79-2.99 2.02c.38 2.02 4.88 19.7 5.19 20.92c.35 1.41 1.41 2.11 2.64 1.23c1.21-.87 11.15-7.46 12.47-8.52z"/></svg>
                  <button className = "btn btn-primary" id = "day-btn">Day</button>
                </div>
                <div className = "theme-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 512 512"><path fill="#FDE364" d="M503.851 210.204C492.563 120.657 434.38 44.485 355.192 7.235c-11.279-5.306-22.337 7.572-15.47 17.982c18.48 28.029 30.919 60.278 35.273 94.838c18.733 148.659-106.281 273.673-254.94 254.94c-34.56-4.354-66.81-16.793-94.839-35.273c-10.41-6.866-23.287 4.191-17.982 15.478c37.25 79.182 113.422 137.364 202.969 148.651c171.226 21.579 315.226-122.414 293.648-293.647"/></svg>
                <button className = "btn btn-primary " id="night-btn">Night</button>
                </div>
                </div>
              <Choice onChoice={this.onChoice} />
              <Link to="/avatar">
                <button
                  className="btn btn-primary btn-lg btn-block"
                  id="avatar-btn"
                >
                  SELECT AVATAR
                </button>
              </Link>
              <Link to="/leaderboard">
              <button
                  className="btn btn-primary btn-lg btn-block"
                  id="leaderboard-btn"
                >
                  LEADERBOARD
                </button>
              </Link>
              </div>
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