const express = require('express');
const { register, login, logout, getCurrentUser, checkAuth } = require('../controller/user.controller');
const { verifyToken } = require('../MiddleWare/authMiddleware');

const userRouter = express.Router();

// Public routes (no authentication required)
userRouter.post('/auth/register', register);
userRouter.post('/auth/login', login);
userRouter.post('/auth/logout', logout);

// Protected routes (authentication required)
userRouter.get('/auth/me', verifyToken, getCurrentUser);
userRouter.get('/auth/check', verifyToken, checkAuth);

module.exports = { userRouter };
