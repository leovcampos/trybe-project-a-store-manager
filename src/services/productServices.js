const productsModel = require('../models/productModels');

const findAllService = async () => {
  const [result] = await productsModel.findAllModel();
  return result;
};

const findByIdService = async (id) => {
  const [[result]] = await productsModel.findByIdModel(id);
  return result || false;
};

const insertProductService = async (productName) => {
  const newProduct = await productsModel.insertProductModel(productName);
  return newProduct;
};

const updateProductService = async (id, name) => {
  const product = await findByIdService(id);
  if (!product) {
    return {
      statusCode: 404,
      message: {
        message: 'Product not found',
      },
    };  
  }

  await productsModel.updateProductModel(id, name);

  return {
    statusCode: 200,
    message: {
      id,
      name,
    },
  };
};

module.exports = {
  findAllService,
  findByIdService,
  insertProductService,
  updateProductService,
};
