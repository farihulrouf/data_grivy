// routes/businessRoutes.js

const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// Route untuk POST data bisnis dengan upload foto
router.post('/', businessController.createBusiness);
router.get('/', businessController.getAllBusinesses);


module.exports = router;
