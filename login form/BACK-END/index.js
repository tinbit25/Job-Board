const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5000', // Frontend domain
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, async () => {
    await connectDB(); // Ensure DB is connected before accepting requests
    console.log(`Server running on port ${port}`);
});
