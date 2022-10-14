const saleServices = require('../services/saleServices');

const findAllSalesController = async (req, res) => {
  const result = await saleServices.findAllSaleService();

  res.status(200).json(result);
};

const findByIdSaleController = async (req, res) => {
  const { id } = req.params;
  const { statusCode, message } = await saleServices.findByIdSaleService(id);
  
  res.status(statusCode).json(message);
};

module.exports = {
  findAllSalesController,
  findByIdSaleController,
};
