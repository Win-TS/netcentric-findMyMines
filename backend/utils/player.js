class Player {
  constructor(name, room, id, startPlayer = 0, avatar) {
    this.name = name;
    this.room = room;
    this.id = id;
    this.startPlayer = startPlayer;
    this.avatar = avatar;
  }
}

module.exports = Player;
