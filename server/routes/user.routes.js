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
        // Populate friends before generating token
        const user = await UserModel.findById(req.user._id).populate('friends');
        
        // Generate access and refresh tokens with complete user data
        const { accessToken, refreshToken } = createTokens(user);

        // Set tokens in cookies
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Use production URL directly
        const frontendURL = 'https://capstone-two-gamma.vercel.app';
            
        // Redirect to the correct callback route
        res.redirect(`${frontendURL}/auth/callback?token=${accessToken}`);
    }
);

module.exports = { userRouter, authRouter };
