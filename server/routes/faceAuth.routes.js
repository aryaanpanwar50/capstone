const express = require("express");
const faceAuthRouter = express.Router();
const { signup, login, verifyFace } = require("../controller/faceAuth.controller");

faceAuthRouter.post("/face/signup", signup);
faceAuthRouter.post("/face/login", login);
faceAuthRouter.post("/face/verify", verifyFace);

module.exports = { faceAuth: faceAuthRouter };
