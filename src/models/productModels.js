const conn = require('./connection');

const findAllModel = async () => conn.execute(
  'SELECT * FROM StoreManager.products ORDER BY id;',
);

const findByIdModel = async (id) => conn.execute(
  `SELECT * FROM StoreManager.products
  WHERE id = ?
  ORDER BY id;`,
  [id],
);

const insertProductModel = async (productName) => {
  const [{ insertId }] = await conn.execute(
    `INSERT INTO StoreManager.products (name)
    VALUES (?);`, [productName],
  );

  return insertId;
};

module.exports = {
  findAllModel,
  findByIdModel,
  insertProductModel,
};
