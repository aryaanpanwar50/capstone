const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected Successfully');
        return connection;
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };
