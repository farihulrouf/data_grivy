// models/SatuanKerja.js
const mongoose = require('mongoose');

const SatuanKerjaSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: true,
  },
  satuan_kerja: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SatuanKerja', SatuanKerjaSchema);
