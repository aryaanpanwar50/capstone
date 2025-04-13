const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');

// Function to generate a random 10-digit number
const generateTenDigitId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Generate a unique 10-digit ID
        let userId;
        let isUnique = false;
        while (!isUnique) {
            userId = generateTenDigitId();
            const existingId = await UserModel.findOne({ id: userId });
            if (!existingId) {
                isUnique = true;
            }
        }

        const hash = await bcrypt.hash(password, 12);
        const user = new UserModel({ 
            name, 
            email, 
            password: hash,
            id: userId
        });
        await user.save();
        
        res.status(201).json({ 
            success: true,
            msg: 'User registered successfully',
            userId,
            user : user
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                msg: 'User not found' 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                msg: 'Invalid credentials' 
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.JWT_SECRET || 'secret', 
            { expiresIn: '1h' }
        );

        // Set JWT token in cookie
        res.cookie('token', token, {
            httpOnly: true,            // Prevents client-side JS from reading the cookie
            secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
            sameSite: 'lax',           // Controls when cookies are sent with cross-site requests
            maxAge: 3600000            // Cookie expiry (1 hour in milliseconds)
        });

        res.status(200).json({ 
            success: true,
            token,                     // Still sending token in response for client storage if needed
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
        });
    }
};

const logout = async (req, res) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;

        if (token) {
            // TODO: In a production environment, you should:
            // 1. Add the token to a blacklist in Redis/database
            // 2. Or maintain a list of revoked tokens until their natural expiration
        }

        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

/**
 * Get the current authenticated user
 * This function is used to verify if a user is logged in and to get their data
 */
const getCurrentUser = async (req, res) => {
    try {
        // Get userId from token
        const userId = req.user.userId;
        
        // Fetch the complete user data from database
        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

/**
 * Check if the user is authenticated without returning user data
 * Useful for simple auth checks on protected routes
 */
const checkAuth = async (req, res) => {
    // If this function is reached, the user is authenticated (verifyToken middleware)
    res.status(200).json({
        success: true,
        isAuthenticated: true
    });
};

module.exports = { register, login, logout, getCurrentUser, checkAuth };
