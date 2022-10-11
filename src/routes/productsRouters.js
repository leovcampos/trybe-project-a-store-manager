const express = require('express');
const productsDB = require('../models/productModels');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [result] = await productsDB.findAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [[result]] = await productsDB.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = router;