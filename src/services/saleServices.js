const saleModels = require('../models/salesModels');

const findAllSaleService = async () => {
  const [allSales] = await saleModels.findAllSalesModel();
  return allSales;
};

const findByIdSaleService = async (id) => {
  const [[sale]] = await saleModels.findByIdSaleModel(id);

  if (sale.length > 0) {
    return {
      statusCode: 200,
      message: sale,
    };
  }

  return {
    statusCode: 404,
    message: {
      message: 'Sale not found',
    },
  };
};

module.exports = {
  findAllSaleService,
  findByIdSaleService,
};
