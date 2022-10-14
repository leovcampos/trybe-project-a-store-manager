const express = require('express');

const salesDB = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesDB);

module.exports = router;
