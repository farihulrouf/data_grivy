const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Business = require('../models/Business');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi Multer untuk upload file ke Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'business_photos',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

const createBusiness = async (req, res) => {
  try {
    const { name, businessName, fullAddress, socialMediaUrl, whatsappNumber, category } = req.body;
    const businessPhoto = req.file('businessPhoto') ? req.file('businessPhoto').path : '';
    const productPhoto = req.file('productPhoto') ? req.file('productPhoto').path : '';

    const newBusiness = new Business({
      name,
      businessName,
      fullAddress,
      socialMediaUrl,
      whatsappNumber,
      category,
      businessPhoto,
      productPhoto,
    });

    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  upload,
  createBusiness,
};
