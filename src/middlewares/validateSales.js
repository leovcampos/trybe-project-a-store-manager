const validateIdProduct = (product) => {
  const productIds = product.every(({ productId = 0 }) => productId);

  if (!productIds) {
    return {
      message: '"productId" is required',
    };
  }
};

const validateQuantity = (product) => {
  const productQuantity = product.every(({ quantity }) => quantity !== undefined);

  if (!productQuantity) {
    return {
      statusCode: 400,
      message: '"quantity" is required',
    };
  }

  const validateNumberQuantity = product.every(({ quantity }) => Number(quantity) > 0);
  if (!validateNumberQuantity) {
    return {
      statusCode: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  return false;
};

const validateSales = (req, res, next) => {
  const saleProducts = req.body;

  if (validateIdProduct(saleProducts)) {
    return res.status(400).json(validateIdProduct(saleProducts));
  }

  if (validateQuantity(saleProducts)) {
    const { statusCode, message } = validateQuantity(saleProducts);
    return res.status(statusCode).json(message);
  }

  next();
};

module.exports = validateSales;