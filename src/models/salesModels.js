const snakeize = require('snakeize');

const conn = require('./connection');

const findAllSalesModel = async () => {
  const [result] = await conn.execute(
    `
  SELECT
    salesProducts.sale_id AS saleId,
    sales.date,
    product_is AS productId,
    sales.quantity
  FROM
    StoreManager.sales_products salesProducts
  INNER JOIN
    StoreManager.sales sales
  ON
    sales.id = salesProducts.sale_id
  ORDER BY
    salesProduct.sale_id;
  `,
  );

  return result;
};

const findByIdSaleModel = async (id) => {
  const [result] = await conn.execute(
    `
    SELECT
      sale.date,
      saleProduct.product_id AS productId,
      saleProduct.quantity,
    FROM StoreManager.sales_products saleProduct
    INNER JOIN StoreManager.sales sale
    ON
      saleProduct.sale_id = sale.id
    WHERE
      saleProduct.sale_id = ?
    ORDER BY
      saleProduct.sale_id;
    `,
    [id],
  );

  return result;
};

const insertNewSaleModel = async () => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales() VALUE();',
  );
  return insertId;
};

const insertSaleModel = async (product) => {
  const columns = Object.keys(snakeize(product))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  await conn.execute(
    `
    INSERT INTO StoreManager.sales_products (${columns})
    VALUE (${placeholders});`,
    [...Object.values(product)],
  );
};

module.exports = {
  findAllSalesModel,
  findByIdSaleModel,
  insertSaleModel,
  insertNewSaleModel,
};
