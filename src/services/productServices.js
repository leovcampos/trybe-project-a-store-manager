const productsModel = require('../models/productModels');

const findAllService = async () => {
  const [result] = await productsModel.findAllModel();
  return result;
};

const findByIdService = async (id) => {
  const [[result]] = await productsModel.findByIdModel(id);
  return result;
};

module.exports = {
  findAllService,
  findByIdService,
};
