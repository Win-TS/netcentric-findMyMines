const { randRoom, randFirstPlayer } = require("../utils/utils");
const Player = require("../utils/player");
const Grid = require("../utils/grid");

const activeRooms = new Map();
const activePlayers = [];
const roomArray = [];
let peopleInRoom;

const makeRoom = (difficulty) => {
  try {
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
  } catch (error) {
    console.error("Error in makeRoom function:", error);
    throw error;
  }
};

const joinRoom = (player, room) => {
  try {
    let currentRoom = activeRooms.get(room);
    updatedPlayerList = currentRoom.players.push(player);
    updatedRoom = { ...activeRooms.get(room), players: updatedPlayerList };
  } catch (error) {
    console.error("Error in joinRoom function:", error);
    throw error;
  }
};

const kick = (room) => {
  try {
    currentRoom = activeRooms.get(room);
    currentRoom.players.pop();
  } catch (error) {
    console.error("Error in kick function:", error);
    throw error;
  }
};

const newGame = (room, difficulty, firstPlayer) => {
  try {
    currentRoom = activeRooms.get(room);
    const grid = new Grid(difficulty, firstPlayer);
    currentRoom.grid = grid;
  } catch (error) {
    console.error("Error in newGame function:", error);
    throw error;
  }
};

const getRoomPlayersNum = (room) => {
  try {
    return activeRooms.get(room).players.length;
  } catch (error) {
    console.error("Error in getRoomPlayersNum function:", error);
    throw error;
  }
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

    socket.on(
      "newRoomJoin",
      ({ room, name, difficulty, avatar, playerIndex }) => {
        if (room === "" || name === "") {
          io.to(socket.id).emit("joinError");
        }
        if (!activePlayers.includes(name)) {
          socket.join(room);
          const id = socket.id;
          const newPlayer = new Player(name, room, id, avatar);
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

          if (!roomArray.includes(room)) {
            roomArray.push(room);
            let firstPlayer = randFirstPlayer();
            io.to(room).emit("setFirstPlayer", {
              firstPlayer: firstPlayer,
            });
            newGame(room, currentRoom.difficulty, firstPlayer);
          }

          let minefield = currentRoom.grid.minefield;
          let gameState = currentRoom.grid.revealedCells;
          let turnInd = currentRoom.grid.playerTurn;
          let players = currentRoom.players.map((player) => [
            player.id,
            player.name,
          ]);
          let avatars = [
            currentRoom.players[0].avatar,
            currentRoom.players[1].avatar,
          ];
          io.to(room).emit("starting", {
            minefield,
            gameState,
            players,
            turnInd,
            avatars,
          });
        }

        if (peopleInRoom === 3) {
          socket.leave(room);
          kick(room);
          io.to(socket.id).emit("joinError");
        }
      }
    );

    socket.on("move", ({ room, playerIndex, row, col }) => {
      currentGrid = activeRooms.get(room).grid;
      if (row !== undefined && col !== undefined) {
        currentGrid.move(row, col, playerIndex);
      }
      if (currentGrid.checkEnd()) {
        io.to(room).emit("winner", {
          gameState: currentGrid.revealedCells,
          turnInd: currentGrid.playerTurn,
          scoreArray: currentGrid.score,
        });
      } else {
        currentGrid.switchTurn();
        io.to(room).emit("update", {
          gameState: currentGrid.revealedCells,
          turnInd: currentGrid.playerTurn,
          scoreArray: currentGrid.score,
        });
        console.log(currentGrid.score);
      }
    });

    socket.on("playAgainRequest", (room) => {
      currentRoom = activeRooms.get(room);
      currentRoom.grid.reset();
      console.log(currentRoom);

      io.to(room).emit("restart", {
        gameState: currentRoom.grid.revealedCells,
        turnInd: currentRoom.grid.playerTurn,
        minefield: currentRoom.grid.minefield,
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
