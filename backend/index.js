// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Enable CORS for frontend requests
app.use(cors());

// Get MongoDB URI from environment variable or use default
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const Log = mongoose.model('Log', new mongoose.Schema({
    message: String,
    timestamp: { type: Date, default: Date.now }
}));

app.get('/', (req, res) => {
    const log = new Log({ message: 'Request received' });
    log.save()
        .then(() => console.log('Log saved'))
        .catch(err => console.error('Log save error:', err));

    res.send('Hello World!');
});

// Add an endpoint to fetch logs
app.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(10);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});