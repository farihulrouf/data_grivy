// controllers/contractController.js
const Contract = require('../models/contractModel');

// Menambahkan kontrak baru
exports.createContract = async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).json({ message: 'Contract created successfully', contract });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mendapatkan semua kontrak
exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan kontrak berdasarkan ID
exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Memperbarui kontrak
exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    res.status(200).json({ message: 'Contract updated successfully', contract });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Menghapus kontrak
exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
