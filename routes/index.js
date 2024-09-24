const express = require('express');
const {
  createContract,
  getContracts,
  getContractById,
  updateContract,
  deleteContract,
} = require('../controllers/contractController');

const {
  createSatuanKerja,
  getSatuanKerja,
  getSatuanKerjaById,
  updateSatuanKerja,
  deleteSatuanKerja,
} = require('../controllers/satuanKerjaController');

const {
  createProvider,
  getProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
} = require('../controllers/providerController'); // Mengimpor controller penyedia

const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); // Mengimpor middleware

const router = express.Router();

// Endpoint untuk registrasi dan login tidak memerlukan token
router.post('/register', register); // Endpoint untuk registrasi
router.post('/login', login); // Endpoint untuk login

// Kontrak routes dengan middleware untuk otorisasi
router.post('/contracts', verifyToken, createContract); // Menambahkan kontrak baru
router.get('/contracts', verifyToken, getContracts); // Mendapatkan semua kontrak
router.get('/contracts/:id', verifyToken, getContractById); // Mendapatkan kontrak berdasarkan ID
router.put('/contracts/:id', verifyToken, updateContract); // Memperbarui kontrak
router.delete('/contracts/:id', verifyToken, deleteContract); // Menghapus kontrak

// Satuan Kerja routes dengan middleware untuk otorisasi
router.post('/satuan-kerja', verifyToken, createSatuanKerja); // Menambahkan satuan kerja baru
router.get('/satuan-kerja', verifyToken, getSatuanKerja); // Mendapatkan semua satuan kerja
router.get('/satuan-kerja/:id', verifyToken, getSatuanKerjaById); // Mendapatkan satuan kerja berdasarkan ID
router.put('/satuan-kerja/:id', verifyToken, updateSatuanKerja); // Memperbarui satuan kerja
router.delete('/satuan-kerja/:id', verifyToken, deleteSatuanKerja); // Menghapus satuan kerja

// Penyedia routes dengan middleware untuk otorisasi
router.post('/providers', verifyToken, createProvider); // Menambahkan penyedia baru
router.get('/providers', verifyToken, getProviders); // Mendapatkan semua penyedia
router.get('/providers/:id', verifyToken, getProviderById); // Mendapatkan penyedia berdasarkan ID
router.put('/providers/:id', verifyToken, updateProvider); // Memperbarui penyedia
router.delete('/providers/:id', verifyToken, deleteProvider); // Menghapus penyedia

module.exports = router;
