const express = require('express');

const productsDB = require('../controllers/productsController');
const validadeProduct = require('../middlewares/validadeProduct');

const router = express.Router();

router.get('/', productsDB.findAllController);

router.get('/:id', productsDB.findByIdController);

router.post('/', validadeProduct, productsDB.insertProductController);

module.exports = router;