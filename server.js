const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Log the URI to check if it's defined

connectDB();

const app = express();

// Update the CORS configuration
app.use(cors({
  origin: 'https://event-buzz-gamma.vercel.app', // Corrected: Removed trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // List all allowed methods
  credentials: true // Allow cookies or authentication headers if needed
}));

app.use(bodyParser.json());

// Test route to check server is working
app.get("/", (req, res) => {
    res.send("Welcome to the Express server!"); // Send a message to the client
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
