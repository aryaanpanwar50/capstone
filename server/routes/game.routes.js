const express = require('express');
const { addGame, getGames, getGameById, updateGame, deleteGame, getGameCount, updateGameCount } = require('../controller/game.controller');
const { verifyToken } = require('../MiddleWare/authMiddleware');

const gameRouter = express.Router();

// Public routes
gameRouter.get('/', getGames);
gameRouter.get('/:id', getGameById);
gameRouter.get('/:id/count', getGameCount);

// Protected routes - require authentication
gameRouter.post('/add', verifyToken, addGame);
gameRouter.patch('/update/:id', verifyToken, updateGame);
gameRouter.patch('/:id/count', verifyToken, updateGameCount);
gameRouter.delete('/delete/:id', verifyToken, deleteGame);

module.exports = { gameRouter };
