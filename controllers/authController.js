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
  console.log('Request Body:', req.body); // Debugging untuk melihat isi req.body
  const { username, password } = req.body;
  console.log("cek one", req.body.email); // Menampilkan username dan password

  // Cek apakah username dan password ada
  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password harus diisi.' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Pengguna tidak ditemukan.' });
  }

  console.log('User found:', user); // Debugging untuk melihat data pengguna
  console.log('Password in DB:', user.password); // Debugging

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch); // Debugging hasil perbandingan
    if (!isMatch) {
      return res.status(400).json({ message: 'Password salah.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
