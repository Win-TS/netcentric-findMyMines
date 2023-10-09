const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game');

router.get('/:difficulty', gameController.bombRandom);

module.exports = router;