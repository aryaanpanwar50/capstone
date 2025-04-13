const crypto = require('crypto');

// Simple in-memory storage for challenges
const challenges = new Map();

const generateAuthOptions = (req, res) => {
    const challenge = crypto.randomBytes(32).toString('base64');
    challenges.set(req.sessionID, challenge);
    
    const options = {
        challenge: Buffer.from(challenge, 'base64'),
        rpId: 'localhost',
        userVerification: 'required',
        timeout: 60000,
    };

    res.json(options);
};

const verifyAuthentication = (req, res) => {
    // In a real app, you would verify the authentication response here
    console.log('Authentication response:', req.body);
    res.json({ verified: true });
};

module.exports = {
    generateAuthOptions,
    verifyAuthentication
};