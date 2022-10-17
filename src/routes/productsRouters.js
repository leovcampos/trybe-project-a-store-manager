const express = require('express');

const productsDB = require('../controllers/productsController');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.get('/', productsDB.findAllController);

router.get('/:id', productsDB.findByIdController);

router.post('/', validateProduct, productsDB.insertProductController);

router.put('/:id', validateProduct, productsDB.updateProductController);

router.delete('/:id', productsDB.deleteProductController);

module.exports = router;