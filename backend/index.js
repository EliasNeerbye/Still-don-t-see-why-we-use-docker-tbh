const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configure CORS - make sure this comes BEFORE your routes
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost',
        'http://docker.caracal.ikt-fag.no',
        'http://caracal.ikt-fag.no',
        // Add any other domains you need to allow
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
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