const conn = require('./connection');

const findAll = () => conn.execute('SELECT * FROM people ORDER BY id');

const findById = (id) => conn.execute('SELECT * FROM people WHERE id = ? ORDER BY id', [id]);

module.exports = {
  findAll,
  findById,
};
