require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const  {connectDB}  = require('./config/db');
const { userRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.routes');
const { friendRequestRouter } = require('./routes/friendRequest.routes');
const {faceAuth}  = require('./routes/faceAuth.routes');
const { fingerAuthRouter } = require('./routes/fingerAuth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5174','https://capstone-puce-rho.vercel.app/'],
  credentials: true
}));


app.use('/user', userRouter);
app.use('/games', gameRouter);
app.use('/friends', friendRequestRouter);
app.use("/api", faceAuth);
app.use("/finger", fingerAuthRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(8080, () => {
            console.log('Server running on port 8080');
        });
    } catch (error) {
        console.error('Server initialization failed:', error);
        process.exit(1);
    }
};

startServer();
