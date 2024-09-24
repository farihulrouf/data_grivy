const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  kodeRup: {
    type: String,
    required: true,
  },
  satuanKerja: {
    type: String,
    required: true,
  },
  namaPaket: {
    type: String,
    required: true,
  },
  metodePengadaan: {
    type: String,
    required: true,
  },
  tanggalKontrak: {
    type: Date,
    required: true,
  },
  awalPelaksanaan: {
    type: Date,
    required: true,
  },
  akhirPelaksanaan: {
    type: Date,
    required: true,
  },
  nilaiKontrak: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

module.exports = mongoose.model('Contract', ContractSchema);
