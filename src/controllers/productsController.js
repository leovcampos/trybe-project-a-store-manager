const productsService = require('../services/productServices');

const findAllController = async (_req, res) => {
  const response = await productsService.findAllService();
  res.status(200).json(response);
};

const findByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.findByIdService(id);

  if (result) {
    return res.status(200).send(result);
  }

  res.status(404).json({ message: 'Product not found' });
};

const insertProductController = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.insertProductService(name);

  res.status(201).json(result);
};

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { statusCode, message } = await productsService.updateProductService(id, name);

  res.status(statusCode).json(message);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;

  const { statusCode, message } = await productsService.deleteProductService(id);

  res.status(statusCode).json(message);
};

module.exports = {
  findAllController,
  findByIdController,
  insertProductController,
  updateProductController,
  deleteProductController,
};
