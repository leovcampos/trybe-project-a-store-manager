const express = require('express');
const productsDB = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsDB.findAllController);

router.get('/:id', productsDB.findByIdController);

module.exports = router;