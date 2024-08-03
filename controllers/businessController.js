// controllers/businessController.js

const Business = require('../models/businessModel');

// Fungsi untuk membuat entitas bisnis baru
const createBusiness = async (req, res) => {
  try {
    const { name, businessName, fullAddress, socialMediaUrl, whatsappNumber, category } = req.body;
    const businessPhoto = req.files.businessPhoto ? req.files.businessPhoto[0].path : null;
    const productPhoto = req.files.productPhoto ? req.files.productPhoto[0].path : null;

    const newBusiness = new Business({
      name,
      businessName,
      fullAddress,
      socialMediaUrl,
      whatsappNumber,
      category,
      businessPhoto,
      productPhoto
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create business' });
  }
};

// Fungsi untuk mendapatkan semua data bisnis dengan paginasi dan filter
const getAllBusinesses = async (req, res) => {
  try {
    // Mendapatkan page, limit, dan filter dari query parameter
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Mendapatkan filter dari query parameter
    const { category, name } = req.query;

    // Membangun query filter
    const filter = {};
    if (category) filter.category = category;
    if (name) filter.name = { $regex: name, $options: 'i' }; // case-insensitive search

    // Mendapatkan data bisnis dengan paginasi dan filter
    const businesses = await Business.find(filter)
      .skip(skip)
      .limit(limit);

    // Mendapatkan total count untuk pagination metadata
    const totalCount = await Business.countDocuments(filter);

    res.status(200).json({
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      businesses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve businesses' });
  }
};

module.exports = {
  createBusiness,
  getAllBusinesses
};
