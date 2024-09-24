// models/providerModel.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProviderSchema = new mongoose.Schema({
  npwp: {
    type: String,
    required: true,
    unique: true, // NPWP harus unik
  },
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  notel: {
    type: String,
    required: true,
    unique: true, // Nomor telepon harus unik
  },
  deskripsi: {
    type: String,
    required: true,
  },
});

// Middleware untuk memastikan npwp dan notel tidak sama
ProviderSchema.pre('save', function (next) {
  if (this.npwp === this.notel) {
    return next(new Error('NPWP dan Nomor Telepon tidak boleh sama.'));
  }
  next();
});

ProviderSchema.plugin(uniqueValidator, { message: '{PATH} harus unik.' });

module.exports = mongoose.model('Provider', ProviderSchema);
