const express = require('express');
const { 
    sendFriendRequest, 
    respondToFriendRequest, 
    getFriendRequests, 
    getFriends,
    removeFriend
} = require('../controller/friendRequest.controller');
const { verifyToken } = require('../MiddleWare/authMiddleware');

const friendRequestRouter = express.Router();

// All friend operations require authentication

// Send a friend request
// Request body should contain: { receiverName: "username of the receiver" }
friendRequestRouter.post('/send', verifyToken, sendFriendRequest);

// Respond to a friend request (accept/reject)
// Request body should contain: { requestId: "id", response: "accepted" or "rejected" }
friendRequestRouter.post('/respond', verifyToken, respondToFriendRequest);

// Get all pending friend requests for the current user (from token)
friendRequestRouter.get('/pending', verifyToken, getFriendRequests);

// Get all friends of the current user (from token)
friendRequestRouter.get('/friends', verifyToken, getFriends);

// Remove a friend
friendRequestRouter.delete('/remove/:friendId', verifyToken, removeFriend);

module.exports = { friendRequestRouter };