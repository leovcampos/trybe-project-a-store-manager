const express = require('express');

const salesDB = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesDB.findAllSalesController);

router.get('/:id', salesDB.findByIdSaleController);

router.post('/', validateSale, salesDB.addSaleController);

module.exports = router;
