const express = require('express');
const passport = require('passport');
const { register, login, logout, getCurrentUser, checkAuth, refreshAccessToken } = require('../controller/user.controller');
const { verifyToken, createTokens } = require('../MiddleWare/authMiddleware');
const { UserModel } = require('../models/user.model');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();
const authRouter = express.Router();

// Public routes (no authentication required)
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/refresh-token', refreshAccessToken);

// Protected routes (authentication required)
userRouter.get('/me', verifyToken, getCurrentUser);
userRouter.get('/check', verifyToken, checkAuth);

// Google Authentication routes
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: 'https://capstone-two-gamma.vercel.app/login'
    }),
    async (req, res) => {
        const user = await UserModel.findById(req.user._id).populate('friends');
        const { accessToken, refreshToken } = createTokens(user);

        // Updated cookie settings
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
            maxAge: 3600000, // 1 hour
            path: '/'
        };

        const refreshCookieOptions = {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        };

        res.cookie('token', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, refreshCookieOptions);

        const frontendURL = process.env.NODE_ENV === 'development' 
            ? 'https://capstone-two-gamma.vercel.app'
            : 'http://localhost:3000';
            
        res.redirect(`${frontendURL}/auth/callback?token=${accessToken}`);
    }
);

module.exports = { userRouter, authRouter };
