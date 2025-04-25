const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const Log = mongoose.model('Log', new mongoose.Schema({
    message: JSON,
    timestamp: { type: Date, default: Date.now }
}));

app.get('/', (req, res) => {
    const log = new Log({ message: req });
    log.save()
        .then(() => console.log('Log saved'))
        .catch(err => console.error('Log save error:', err));

    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});