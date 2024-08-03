// models/businessModel.js

const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  fullAddress: { type: String, required: true },
  socialMediaUrl: { type: String },
  whatsappNumber: { type: String },
  category: { type: String },
  businessPhoto: { type: String },
  productPhoto: { type: String }
});

module.exports = mongoose.model('Business', businessSchema);
