const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", process.env.IP_FRONT],
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 9000;

const gameRouter = require("./routes/gameRoutes");
const scoreRouter = require("./routes/scoreRoutes");
const mainController = require("./controllers/main");
const errorController = require("./controllers/errors");
const mongoUri = process.env.MONGO_URI;
mainController.initializeSocket(io);

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "findMyMines",
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/game", gameRouter);
app.use("/score", scoreRouter);

app.get("*", errorController.get404);

server.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
});
