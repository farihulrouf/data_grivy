// routes/contractRoutes.js
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

const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); // Mengimpor middleware

const router = express.Router();

// Endpoint untuk registrasi dan login tidak memerlukan token
router.post('/register', register); // Endpoint untuk registrasi
router.post('/login', login); // Endpoint untuk login

// Kontrak routes dengan middleware untuk otorisasi
router.post('/', verifyToken, createContract); // Menambahkan kontrak baru
router.get('/', verifyToken, getContracts); // Mendapatkan semua kontrak
router.get('/:id', verifyToken, getContractById); // Mendapatkan kontrak berdasarkan ID
router.put('/:id', verifyToken, updateContract); // Memperbarui kontrak
router.delete('/:id', verifyToken, deleteContract); // Menghapus kontrak

// Satuan Kerja routes dengan middleware untuk otorisasi
router.post('/satuan-kerja', verifyToken, createSatuanKerja); // Menambahkan satuan kerja baru
router.get('/satuan-kerja', verifyToken, getSatuanKerja); // Mendapatkan semua satuan kerja
router.get('/satuan-kerja/:id', verifyToken, getSatuanKerjaById); // Mendapatkan satuan kerja berdasarkan ID
router.put('/satuan-kerja/:id', verifyToken, updateSatuanKerja); // Memperbarui satuan kerja
router.delete('/satuan-kerja/:id', verifyToken, deleteSatuanKerja); // Menghapus satuan kerja

module.exports = router;
