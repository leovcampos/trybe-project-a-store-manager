const snakeize = require('snakeize');

const conn = require('./connection');

const findAllSalesModel = async () => {
  const [result] = await conn.execute(
    `
  SELECT
    saleProduct.sale_id AS saleId,
    sale.date,
    saleProduct.product_id AS productId,
    saleProduct.quantity
  FROM
    StoreManager.sales_products saleProduct
  INNER JOIN
    StoreManager.sales sale
  ON
    sale.id = saleProduct.sale_id
  ORDER BY
    saleProduct.sale_id;
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
    saleProduct.quantity
  FROM StoreManager.sales_products saleProduct
  INNER JOIN StoreManager.sales sale
  ON
    sale.id = saleProduct.sale_id
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

const deleteSaleModel = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    `
      DELETE FROM
        StoreManager.sales
      WHERE
        id = ?
    `,
    [id],
  );

  return affectedRows;
};

const updateSaleModel = async ({ quantity, saleId, productId }) => {
  const [{ affectedRows }] = await conn.execute(
    `
    UPDATE
      StoreManager.sales_products
    SET
      quantity = ?
    WHERE
      sale_id = ? AND product_id = ?
    `,
    [quantity, saleId, productId],
  );

  return affectedRows;
};

module.exports = {
  findAllSalesModel,
  findByIdSaleModel,
  insertSaleModel,
  insertNewSaleModel,
  deleteSaleModel,
  updateSaleModel,
};
