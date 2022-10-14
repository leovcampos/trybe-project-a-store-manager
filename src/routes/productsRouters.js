const express = require('express');

const productsDB = require('../controllers/productsController');
const validateProduct = require('../middlewares/validadeProduct');

const router = express.Router();

router.get('/', productsDB.findAllController);

router.get('/:id', productsDB.findByIdController);

router.post('/', validateProduct, productsDB.insertProductController);

router.put('/:id', validateProduct, productsDB.updateProductController);

module.exports = router;