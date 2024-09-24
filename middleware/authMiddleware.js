// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Mengambil token dari header

  if (!token) {
    return res.status(403).json({ message: 'Token tidak disediakan.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid.' });
    }

    req.userId = decoded.id; // Simpan userId ke request untuk digunakan di rute selanjutnya
    next(); // Lanjutkan ke rute berikutnya
  });
};

module.exports = verifyToken;
