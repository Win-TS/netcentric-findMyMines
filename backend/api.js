const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const {Server} = require('socket.io');
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})
const port = 9000;

const gameRouter = require('./routes/gameRoutes');
const scoreRouter = require('./routes/scoreRoutes');
const mainController = require('./controllers/main');
const errorController = require('./controllers/errors');
const mongoUri = 'mongodb+srv://WinTS:424535Win@cluster0.euj7bfd.mongodb.net/?retryWrites=true&w=majority';
let onlineClients = 0;

mainController.initializeSocket(io);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/game', gameRouter);
app.use('/score', scoreRouter);

app.get('*', errorController.get404);

server.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
});