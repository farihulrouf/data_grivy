// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrasi pengguna
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Cek apakah pengguna sudah ada
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Pengguna sudah terdaftar.' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();
  res.status(201).json({ message: 'Pengguna berhasil terdaftar.' });
};

// Login pengguna
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Cek apakah pengguna ada
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Pengguna tidak ditemukan.' });
  }

  // Cek password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Password salah.' });
  }

  // Buat dan tanda tangani JWT
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ token });
};
