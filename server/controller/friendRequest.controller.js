const { FriendRequestModel } = require('../models/friendRequest.model');
const { UserModel } = require('../models/user.model');

// Send a friend request
const sendFriendRequest = async (req, res) => {
    try {
        // Get sender ID from authenticated user token
        const senderId = req.user.userId;
        
        // Get receiver name from request body
        const { receiverName } = req.body;
        
        if (!receiverName) {
            return res.status(400).json({
                success: false,
                message: 'Receiver name is required'
            });
        }

        // Check if sender exists
        const sender = await UserModel.findById(senderId);
        if (!sender) {
            return res.status(404).json({
                success: false,
                message: 'Sender not found (invalid authentication)'
            });
        }

        // Find receiver by name and get their ID
        const receiver = await UserModel.findOne({ name: receiverName });
        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: 'Receiver not found'
            });
        }
        
        // Get receiver's MongoDB _id as string
        const receiverId = receiver._id.toString();

        // Check if sender and receiver are the same
        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot send a friend request to yourself'
            });
        }

        // Check if request already exists
        const existingRequest = await FriendRequestModel.findOne({
            sender: senderId,
            receiver: receiverId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'Friend request already sent'
            });
        }

        // Check if they are already friends
        if (sender.friends && sender.friends.includes(receiverId)) {
            return res.status(400).json({
                success: false,
                message: 'You are already friends with this user'
            });
        }

        // Create new friend request with MongoDB IDs
        const friendRequest = new FriendRequestModel({
            sender: senderId,
            receiver: receiverId
        });

        await friendRequest.save();

        res.status(201).json({
            success: true,
            message: 'Friend request sent successfully',
            request: {
                id: friendRequest._id,
                sender: sender.name,
                receiver: receiver.name,
                status: friendRequest.status,
                createdAt: friendRequest.createdAt
            }
        });
    } catch (error) {
        console.error('Send friend request error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Accept a friend request
const respondToFriendRequest = async (req, res) => {
    try {
        const { requestId, response } = req.body;

        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: 'Request ID is required'
            });
        }

        if (!['accepted', 'rejected'].includes(response)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid response type'
            });
        }

        const friendRequest = await FriendRequestModel.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({
                success: false,
                message: 'Friend request not found'
            });
        }

        // Verify the user responding is the receiver
        const userId = req.user.userId;
        if (friendRequest.receiver.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You cannot respond to this request as it was not sent to you'
            });
        }

        if (friendRequest.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'This request has already been processed'
            });
        }

        // Update request status
        friendRequest.status = response;
        await friendRequest.save();

        // If accepted, add each user to the other's friends list
        if (response === 'accepted') {
            await UserModel.findByIdAndUpdate(
                friendRequest.sender,
                { $addToSet: { friends: friendRequest.receiver } }
            );

            await UserModel.findByIdAndUpdate(
                friendRequest.receiver,
                { $addToSet: { friends: friendRequest.sender } }
            );

            return res.status(200).json({
                success: true,
                message: 'Friend request accepted',
                request: friendRequest
            });
        }

        // If rejected
        res.status(200).json({
            success: true,
            message: 'Friend request rejected',
            request: friendRequest
        });
    } catch (error) {
        console.error('Respond to friend request error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get all friend requests for a user
const getFriendRequests = async (req, res) => {
    try {
        // Get user ID from token
        const userId = req.user.userId;

        const requests = await FriendRequestModel.find({
            receiver: userId,
            status: 'pending'
        }).populate('sender', 'name email');

        res.status(200).json({
            success: true,
            requests
        });
    } catch (error) {
        console.error('Get friend requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get all friends of a user
const getFriends = async (req, res) => {
    try {
        // Get user ID from token
        const userId = req.user.userId;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get friend details
        const friends = await UserModel.find(
            { _id: { $in: user.friends } },
            { name: 1, email: 1, _id: 1 }
        );

        res.status(200).json({
            success: true,
            friends
        });
    } catch (error) {
        console.error('Get friends error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

/**
 * Remove a friend from the user's friends list
 * This also removes the current user from the friend's friends list
 */
const removeFriend = async (req, res) => {
    try {
        const userId = req.user.userId;
        const friendId = req.params.friendId;

        // Validate friendId
        if (!friendId) {
            return res.status(400).json({
                success: false,
                message: 'Friend ID is required'
            });
        }

        // Remove friend from user's friends list
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.friends.includes(friendId)) {
            return res.status(400).json({
                success: false,
                message: 'This user is not in your friends list'
            });
        }

        // Remove the friend from user's friends list
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { friends: friendId }
        });

        // Remove the user from friend's friends list
        await UserModel.findByIdAndUpdate(friendId, {
            $pull: { friends: userId }
        });

        res.status(200).json({
            success: true,
            message: 'Friend removed successfully'
        });
    } catch (error) {
        console.error('Remove friend error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = { 
    sendFriendRequest, 
    respondToFriendRequest, 
    getFriendRequests, 
    getFriends,
    removeFriend 
};