const scoreModel = require("../models/newScore");

exports.postNewScore = async (req, res) => {
  try {
    console.log(req.query);
    const newScore = await scoreModel.create({
      name: req.query.name,
      score: req.query.score,
      difficulty: req.query.difficulty,
    });
    res.send(newScore);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the score");
  }
};

exports.getLeaderboards = async (req, res) => {
  const { difficulty } = req.query;
  try {
    const leaderboards = await scoreModel
      .find({ difficulty })
      .sort({ score: -1 })
      .limit(15)
      .exec();
    res.send({ leaderboards });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching leaderboards");
  }
};
