const express = require("express");
const router = express.Router();

const scoreController = require("../controllers/score");

router.get("/leaderboards", scoreController.getLeaderboards);
router.post("/new-score", scoreController.postNewScore);

module.exports = router;
