const express = require('express');
const { register, login, logout, getCurrentUser, checkAuth } = require('../controller/user.controller');
const { verifyToken } = require('../MiddleWare/authMiddleware');

const userRouter = express.Router();

// Public routes (no authentication required)
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

// Protected routes (authentication required)
userRouter.get('/me', verifyToken, getCurrentUser);
userRouter.get('/check', verifyToken, checkAuth);

module.exports = { userRouter };
