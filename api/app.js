const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('../config/mongo');
const contractRoutes = require('../routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS middleware configuration
const allowedOrigins = ['http://localhost:3001'];

app.use(cors({
  origin: function (origin, callback) {
    // If no origin or origin is in the list of allowed origins, allow the request
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'], // Allow headers
  credentials: true, // Enable credentials (cookies, authorization headers)
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/contracts', contractRoutes);

// Handle preflight requests (CORS preflight)
app.options('*', cors()); // Allow pre-flight requests for all routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
