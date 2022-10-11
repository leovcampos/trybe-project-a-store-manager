const productsModel = require('../models/productModels');

const findAllService = async () => {
  const [result] = await productsModel.findAllModel();
  return result;
};

const findByIdService = async () => {
  const [[result]] = await productsModel.findByIdModel();
  return result;
};

module.exports = {
  findAllService,
  findByIdService,
};
