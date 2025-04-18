require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const RedisStore = require('connect-redis')(session); // Removed temp
// const redis = require('redis');
const { connectDB } = require('./config/db');
const { userRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.routes');
const { friendRequestRouter } = require('./routes/friendRequest.routes');
const { faceAuth } = require('./routes/faceAuth.routes');
const MongoStore  = require('connect-mongo')

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS with credentials for local + deployed frontends
app.use(cors({
  origin: ['http://localhost:5173', 'https://capstone-puce-rho.vercel.app'],
  credentials: true
}));

// ⚠️ Session middleware required for WebAuthn
app.use(session({
  secret: process.env.SESSION_SECRET || 'someDefaultSecret', //MUST BE UPDATED
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // CHANGE TO TRUE WHEN ON HTTPS
    sameSite: 'lax'
  },
  store:MongoStore.create({
    mongoUrl:process.env.MONGO_URL,
    collectionName:'sessions'
  })
}));

// Routes
app.use('/user', userRouter);
app.use('/games', gameRouter);
app.use('/friends', friendRequestRouter);
app.use('/api', faceAuth);


// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(8080, () => {
      console.log('✅ Server running on port 8080');
    });
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    process.exit(1);
  }
};

startServer();