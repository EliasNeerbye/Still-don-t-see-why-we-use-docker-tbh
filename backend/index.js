const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({
  origin: '*',  // Allow all origins for testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Get MongoDB URI from environment variable or use default
const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/mydatabase';

mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected');
        // Create some initial logs when the server starts
        createInitialLogs();
    })
    .catch(err => console.error('MongoDB connection error:', err));

const Log = mongoose.model('Log', new mongoose.Schema({
    message: String,
    timestamp: { type: Date, default: Date.now }
}));

// Function to create initial logs
async function createInitialLogs() {
    try {
        const count = await Log.countDocuments();
        if (count === 0) {
            // Only create initial logs if none exist
            const initialLogs = [
                { message: 'Server started' },
                { message: 'Initial setup complete' },
                { message: 'Ready to receive requests' }
            ];
            
            await Log.insertMany(initialLogs);
            console.log('Initial logs created');
        } else {
            console.log(`${count} logs already exist`);
        }
    } catch (err) {
        console.error('Error creating initial logs:', err);
    }
}

// Root endpoint
app.get('/', (req, res) => {
    const log = new Log({ message: 'Root endpoint accessed' });
    log.save()
        .then(() => console.log('Log saved'))
        .catch(err => console.error('Log save error:', err));

    res.send('Hello World! Backend is running.');
});

// Get logs endpoint
app.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(10);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new log endpoint
app.post('/logs', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        const log = new Log({ message });
        await log.save();
        
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});