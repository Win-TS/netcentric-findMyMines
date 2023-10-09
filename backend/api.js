const express = require('express');
const {Server} = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const port = 9000;

//const io = new Server();

const gameRouter = require('./routes/gameRoutes');
const scoreRouter = require('./routes/scoreRoutes');
//const mainController = require('./controllers/main')(io);
const errorController = require('./controllers/errors');
const mongoUri = 'mongodb+srv://WinTS:424535Win@cluster0.euj7bfd.mongodb.net/?retryWrites=true&w=majority';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

//app.get('/', mainController.newConnection);

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

app.use('/game', gameRouter);
app.use('/score', scoreRouter);

app.get('*', errorController.get404);

app.listen(port, () => {
  console.log(`Server is running on port ${port} at http://localhost:${port}`);
});