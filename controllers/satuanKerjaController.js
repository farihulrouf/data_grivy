// controllers/satuanKerjaController.js
const SatuanKerja = require('../models/satuanKerjaModel');

// Menambahkan satuan kerja baru
exports.createSatuanKerja = async (req, res) => {
  try {
    const satuanKerja = new SatuanKerja(req.body);
    await satuanKerja.save();
    res.status(201).json({ message: 'Satuan kerja created successfully', satuanKerja });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mendapatkan semua satuan kerja
exports.getSatuanKerja = async (req, res) => {
  try {
    const satuanKerja = await SatuanKerja.find();
    res.status(200).json(satuanKerja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan satuan kerja berdasarkan ID
exports.getSatuanKerjaById = async (req, res) => {
  try {
    const satuanKerja = await SatuanKerja.findById(req.params.id);
    if (!satuanKerja) return res.status(404).json({ message: 'Satuan kerja not found' });
    res.status(200).json(satuanKerja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memperbarui satuan kerja
exports.updateSatuanKerja = async (req, res) => {
  try {
    const satuanKerja = await SatuanKerja.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!satuanKerja) return res.status(404).json({ message: 'Satuan kerja not found' });
    res.status(200).json({ message: 'Satuan kerja updated successfully', satuanKerja });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus satuan kerja
exports.deleteSatuanKerja = async (req, res) => {
  try {
    const satuanKerja = await SatuanKerja.findByIdAndDelete(req.params.id);
    if (!satuanKerja) return res.status(404).json({ message: 'Satuan kerja not found' });
    res.status(200).json({ message: 'Satuan kerja deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
