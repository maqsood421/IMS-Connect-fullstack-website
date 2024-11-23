require('dotenv').config();
const express = require('express');
// const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const voteRoutes = require('./routes/voteRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const cors = require("cors")
const app = express();
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:5173',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));


const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log('MongoDb Connected..');
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
}
connectDB('mongodb://127.0.0.1:27017/ims-db');

// Middleware
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/rewards', rewardRoutes)

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
