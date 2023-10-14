const { randRoom, randFirstPlayer } = require("../utils/utils");
const Player = require("../utils/player");
const Grid = require("../utils/grid");

const activeRooms = new Map();
const activePlayers = [];
let peopleInRoom;

const makeRoom = (difficulty) => {
  let newRoom = randRoom();
  while (activeRooms.has(newRoom)) {
    newRoom = randRoom();
  }
  activeRooms.set(newRoom, {
    roomId: newRoom,
    players: [],
    difficulty: difficulty,
    grid: null,
  });
  return newRoom;
};

const joinRoom = (player, room) => {
  let currentRoom = activeRooms.get(room);
  updatedPlayerList = currentRoom.players.push(player);
  updatedRoom = { ...activeRooms.get(room), players: updatedPlayerList };
};

const kick = (room) => {
  currentRoom = activeRooms.get(room);
  currentRoom.players.pop();
};

const getRoomPlayersNum = (room) => {
  return activeRooms.get(room).players.length;
};

const setFirstPlayer = () => {
  const playerA = randFirstPlayer();
  const playerB = playerA === 1 ? 1 : 0;
  return playerA < playerB ? 0 : 1;
};

const newGame = (room, difficulty, firstPlayer) => {
  currentRoom = activeRooms.get(room);
  const grid = new Grid(difficulty, firstPlayer);
  currentRoom.grid = grid;
};

exports.initializeSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("newGame", ({ difficulty }) => {
      let room = makeRoom(difficulty);
      socket.emit("newGameCreated", { room, difficulty });
    });

    socket.on("joining", ({ room }) => {
      if (activeRooms.has(room)) {
        socket.emit("joinConfirmed", {
          difficulty: activeRooms.get(room).difficulty,
        });
      } else {
        socket.emit("errorMessage", "No room with that id found");
      }
    });

    socket.on("newRoomJoin", ({ room, name, difficulty, avatar, playerIndex }) => {
      if (room === "" || name === "") {
        io.to(socket.id).emit("joinError");
      }
      if (!activePlayers.includes(name)) {
        socket.join(room);
        const id = socket.id;
        const newPlayer = new Player(name, room, id, undefined, avatar);
        activePlayers.push(name);
        joinRoom(newPlayer, room);
        peopleInRoom = getRoomPlayersNum(room);
      }

      if (peopleInRoom === 1) {
        io.to(room).emit("waiting");
      }

      if (peopleInRoom === 2) {
        let currentRoom = activeRooms.get(room);
        currentPlayers = currentRoom.players;
        let firstPlayer = setFirstPlayer();
        for (const player of currentPlayers) {
          io.to(player.id).emit("setFirstPlayer", {
            firstPlayer: firstPlayer,
            id: player.id,
          });
        }
        newGame(room, currentRoom.difficulty, firstPlayer);
        let gameState = currentRoom.grid.revealedCells;
        let turn = currentRoom.grid.playerTurn;
        let players = currentRoom.players.map((player) => [
          player.id,
          player.name,
        ]);
        let avatars = [currentRoom.players[0].avatar, currentRoom.players[1].avatar];
        console.log(avatars);
        io.to(room).emit("starting", { gameState, players, turn, avatars });
      }

      if (peopleInRoom === 3) {
        socket.leave(room);
        kick(room);
        io.to(socket.id).emit("joinError");
      }
    });

    socket.on("move", ({ room, player, row, col }) => {
      currentGrid = activeRooms.get(room).grid;
      currentGrid.move(row, col, player);
      if (currentGrid.checkWinner()) {
        io.to(room).emit("winner", {
          gameState: currentGrid.revealedCells,
          player: currentGrid.playerTurn,
        });
      } else {
        currentGrid.switchTurn();
        io.to(room).emit("update", {
          gameState: currentGrid.revealedCells,
          turn: currentGrid.playerTurn,
        });
      }
    });

    socket.on("playAgainRequest", (room) => {
      currentRoom = activeRooms.get(room);
      currentRoom.grid.reset();
      currentPlayers = currentRoom.players;
      for (const player of currentPlayers) {
        io.to(player.id).emit("setFirstPlayer", {
          firstPlayer: currentRoom.playerTurn,
          id: player.id,
        });
      }
      io.to(room).emit("restart", {
        gameState: currentRoom.grid.game,
        turn: currentRoom.grid.playerTurn,
      });
    });

    socket.on("disconnect", () => {
      const currentRooms = Object.keys(socket.rooms);
      if (currentRooms.length === 2) {
        const room = currentRooms[1];
        const currentRoom = activeRooms.get(room);
        if (currentRoom) {
          const playerIndex = currentRoom.players.findIndex(
            (player) => player.id === socket.id
          );
          if (playerIndex !== -1) {
            currentRoom.players.splice(playerIndex, 1);
          }
          if (currentRoom.players.length === 0) {
            activeRooms.delete(room);
          } else {
            io.to(room).emit("roomUpdated", currentRoom);
            io.to(room).emit("waiting");
          }
        }
      }
      const playerIndex = activePlayers.indexOf(socket.id);
      if (playerIndex !== -1) {
        activePlayers.splice(playerIndex, 1);
      }
    });
  });

  return io;
};
