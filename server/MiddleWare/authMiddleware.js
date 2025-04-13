const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Get token from request headers or cookies
    let token = req.cookies?.token;
    
    // If token is not in cookies, check Authorization header
    if (!token) {
      const authHeader = req.headers.authorization;
      token = authHeader && authHeader.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. Login to continue.' 
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    // console.log(decoded);
    // Attach user to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports = { verifyToken }; 