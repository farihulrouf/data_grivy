const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const businessRoutes = require('../routes/businessRoutes');
require('dotenv').config();

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors({
  origin: '*', // Ganti '*' dengan domain frontend Anda jika diperlukan
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Set up Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'business',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

// Routes
app.use('/api/business', upload.fields([
  { name: 'businessPhoto', maxCount: 1 },
  { name: 'productPhoto', maxCount: 1 },
]), businessRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route for root URL
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port', process.env.PORT || 3000);
});

module.exports = app;
