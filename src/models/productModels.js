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
    VALUE (?);`, [productName],
  );

  const [[newProduct]] = await findByIdModel(insertId);
  return newProduct;
};

const updateProductModel = async (id, name) => {
  const [{ affectedRows }] = await conn.execute(
    `UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?;`,
    [name, id],
  );

  return affectedRows;
};

const deleteProductModel = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    `DELETE FROM StoreManager.products
  WHERE id = ?;`,
    [id],
  );

  return affectedRows;
}; 

module.exports = {
  findAllModel,
  findByIdModel,
  insertProductModel,
  updateProductModel,
  deleteProductModel,
};
