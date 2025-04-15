// fingerAuth.controller.js
const crypto = require('crypto');

// Simple in-memory storage for challenges (DO NOT USE IN PRODUCTION)
const challenges = new Map();

const generateAuthOptions = (req, res) => {
    const challenge = crypto.randomBytes(32);
    challenges.set(req.sessionID, challenge);
  
    const rpId = process.env.NODE_ENV === 'production'
      ? 'capstone-puce-rho.vercel.app'
      : 'localhost';
  
    const options = {
      challenge: challenge.toString('base64url'), // Encode using base64url
      rpId: rpId,
      userVerification: 'required',
      timeout: 60000,
      allowCredentials: [
        {
          type: 'public-key',
          id: 'exampleCredentialIdBase64url', // You need to pass real credentialId from registration
          transports: ['internal'], // Required for platform authenticators like Windows Hello
        }
      ],
      authenticatorSelection: {
        requireResidentKey: false,
        userVerification: 'required',
        authenticatorAttachment: 'platform',
      },
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
  verifyAuthentication,
};
