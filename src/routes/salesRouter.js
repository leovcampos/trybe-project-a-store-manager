const express = require('express');

const salesDB = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesDB.findAllSalesController);

router.get('/:id', salesDB.findByIdSaleController);

router.post('/', salesDB.addSaleController);

module.exports = router;
