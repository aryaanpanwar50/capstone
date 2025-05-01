const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { UserModel } = require('../models/user.model');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://your-render-service.onrender.com/auth/google/callback",

    proxy: true
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await UserModel.findOne({ googleId: profile.id });
        
        if (!user) {
            // Create new user if doesn't exist
            user = await UserModel.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                password: null, // Google authenticated users don't need a password
                profilePicture: profile.photos[0].value
            });
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport;