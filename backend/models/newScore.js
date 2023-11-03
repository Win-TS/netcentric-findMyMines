const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  name: String,
  score: Number,
  difficulty: String,
});

const ScoreModel = mongoose.model("Leaderboard", ScoreSchema);

module.exports = ScoreModel;
