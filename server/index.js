require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
const MongoStore  = require('connect-mongo');
const { connectDB } = require('./config/db');
const { userRouter, authRouter } = require('./routes/user.routes');
const { gameRouter } = require('./routes/game.routes');
const { friendRequestRouter } = require('./routes/friendRequest.routes');
const { faceAuth } = require('./routes/faceAuth.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Enable CORS with credentials for all origins
app.use(cors({
  origin: true,
  credentials: true
}));

// Trust proxy - important for OAuth callbacks
app.set('trust proxy', 1);

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'someDefaultSecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
  })
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRouter);
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