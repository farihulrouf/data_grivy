const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');
const Business = require('../models/Business');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Konfigurasi Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fungsi untuk meng-upload file ke Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error);
      resolve(result);
    });
    Readable.from(file.buffer).pipe(stream);
  });
};

const createBusiness = async (req, res) => {
  try {
    const { name, businessName, fullAddress, socialMediaUrl, whatsappNumber, category } = req.body;
    const businessPhoto = req.file('businessPhoto') ? await uploadToCloudinary(req.file('businessPhoto')) : '';
    const productPhoto = req.file('productPhoto') ? await uploadToCloudinary(req.file('productPhoto')) : '';

    const newBusiness = new Business({
      name,
      businessName,
      fullAddress,
      socialMediaUrl,
      whatsappNumber,
      category,
      businessPhoto: businessPhoto.secure_url,
      productPhoto: productPhoto.secure_url,
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
