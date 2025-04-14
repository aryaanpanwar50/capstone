const crypto = require('crypto');
require('dotenv').config();

// Simple in-memory storage for challenges
const challenges = new Map();

const generateAuthOptions = (req, res) => {
    const challenge = crypto.randomBytes(32).toString('base64');
    challenges.set(req.sessionID, challenge);

    const fullHost = req.get('host'); // e.g., "localhost:8080" or "capstone-puce-rho.vercel.app"
    const hostname = fullHost.split(':')[0]; // strips off any port
    const isLocalhost = hostname.includes('localhost');

    const rpId = isLocalhost ? 'localhost' : process.env.RP_ID || hostname;

    const options = {
        challenge: Buffer.from(challenge, 'base64'),
        rpId,
        userVerification: 'required',
        timeout: 60000,
    };

    console.log('Generated challenge for session:', req.sessionID);
    console.log('Sending rpId:', rpId);

    res.json(options);
};

const verifyAuthentication = (req, res) => {
    // In a real application, verify the response using user's publicKeyCredential
    console.log('Authentication response:', req.body);
    res.json({ verified: true });
};

module.exports = {
    generateAuthOptions,
    verifyAuthentication
};
