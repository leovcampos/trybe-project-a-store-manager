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

module.exports = {
  findAllModel,
  findByIdModel,
};
