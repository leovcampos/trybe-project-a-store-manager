const productsService = require('../services/productServices');

const findAllController = async (_req, res) => {
  const response = await productsService.findAllService();
  res.status(200).json(response);
};

const findByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.findByIdService(id);

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  findAllController,
  findByIdController,
};
