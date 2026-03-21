require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
    // Accept requests from the Vite frontend during development, or anywhere if generalized
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Main Router
app.use('/api', routes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
