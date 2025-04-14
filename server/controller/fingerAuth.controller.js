const crypto = require('crypto');
require('dotenv').config();

// In-memory storage for demo only
const challenges = new Map();

const generateAuthOptions = (req, res) => {
    const sessionID = req.sessionID;

    if (!sessionID) {
        return res.status(400).json({ error: 'Session ID is missing. Is express-session configured?' });
    }

    const challenge = crypto.randomBytes(32).toString('base64url');
    challenges.set(sessionID, challenge);

    const fullHost = req.get('host'); // e.g., localhost:8080 or vercel.app
    const hostname = fullHost.split(':')[0];
    const isLocalhost = hostname.includes('localhost');

    const rpId = isLocalhost ? 'localhost' : process.env.RP_ID || hostname;

    const options = {
        challenge: challenge,
        rpId,
        userVerification: 'required',
        timeout: 60000,
    };

    console.log('Generated challenge for session:', sessionID);
    console.log('Sending rpId:', rpId);

    res.json(options);
};

const verifyAuthentication = (req, res) => {
    const sessionID = req.sessionID;

    if (!sessionID || !challenges.has(sessionID)) {
        return res.status(400).json({ error: 'No matching challenge found for this session.' });
    }

    const challenge = challenges.get(sessionID);
    console.log('Authenticating with challenge:', challenge);
    console.log('Client response:', req.body);

    // TODO: Actually verify the authentication (using @simplewebauthn/server)

    challenges.delete(sessionID); // Clean up
    res.json({ verified: true });
};

module.exports = {
    generateAuthOptions,
    verifyAuthentication
};
