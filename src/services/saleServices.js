const saleModels = require('../models/salesModels');
const productServices = require('./productServices');

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

const checkProductId = async (product) => {
  const result = [];

  await Promise.all(
    product.map(async ({ productId }) => {
      const id = await productServices.findByIdService(productId);
      result.push(id);
    }),
  );

  return result.every((e) => e);
};

const productsObj = (saleId, products) => products
  .map((product) => ({
    ...product,
    saleId,
  }));

const createSale = async (saleId, saleProducts) => {
  const resultSales = productsObj(saleId, saleProducts);
  await Promise.all(
    resultSales.map(async (product) => saleModels.insertSaleModel(product)),
  );
};

const mapSale = (sales) => sales.map((sale) => {
    const mappedSale = sale;
    delete mappedSale.date;
    return mappedSale;
  });

const addSaleService = async (saleProducts) => {
  const validateSale = await checkProductId(saleProducts);
  if (!validateSale) {
    return {
      statusCode: 404,
      message: { message: 'Product not found' },
    };
  }

  const saleId = await saleModels.insertNewSaleModel();

  await createSale(saleId, saleProducts);

  const { message } = await findByIdSaleService(saleId);

  return {
    statusCode: 201,
    message: {
      id: saleId,
      itemsSold: mapSale(message),
    },
  };
};

module.exports = {
  findAllSaleService,
  findByIdSaleService,
  addSaleService,
};
