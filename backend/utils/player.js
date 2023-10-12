class Player {
  constructor(name, room, id, startPlayer = 0) {
    this.name = name;
    this.room = room;
    this.id = id;
    this.startPlayer = startPlayer;
  }
}

module.exports = Player;
