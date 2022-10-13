const productsModel = require('../models/productModels');

const findAllService = async () => {
  const [result] = await productsModel.findAllModel();
  return result;
};

const findByIdService = async (id) => {
  const [[result]] = await productsModel.findByIdModel(id);
  return result;
};

const insertProductService = async (productName) => {
  const newProduct = await productsModel.insertProductModel(productName);
  return newProduct;
};

module.exports = {
  findAllService,
  findByIdService,
  insertProductService,
};
