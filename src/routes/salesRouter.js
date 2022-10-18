const express = require('express');

const salesDB = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSales');

const router = express.Router();

router.post('/', validateSale, salesDB.addSaleController);

router.get('/', salesDB.findAllSalesController);

router.get('/:id', salesDB.findByIdSaleController);

router.delete('/:id', salesDB.deleteSaleController);

module.exports = router;
