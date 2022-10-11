const conn = require('./connection');

const findAllModel = () => conn.execute(
  `SELECT * FROM StoreManager.products
  ORDER BY id DESC;`
);

const findByIdModel = (id) => conn.execute(
  `SELECT * FROM StoreManager.products
  WHERE id = ?
  ORDER BY id;`,
  [id]
);

module.exports = {
  findAllModel,
  findByIdModel,
};
