const express = require('express');
const { generateAuthOptions, verifyAuthentication } = require('../controller/fingerAuth.controller');

const fingerAuthRouter = express.Router();

fingerAuthRouter.post('/generate-authentication-options', generateAuthOptions);
fingerAuthRouter.post('/verify-authentication', verifyAuthentication);

module.exports = { fingerAuthRouter };