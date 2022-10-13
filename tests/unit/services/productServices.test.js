const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productServices = require('../../../src/services/productServices');
const productModel = require('../../../src/models/productModels');

const { productsDB, productId } = require('../../mocks/productsMock');

describe('Testes unitários para a pasta services', function () {
  it('Teste se lista todos os produtos', async function () {
    sinon.stub(productModel, 'findAllModel').resolves([productsDB]);

    const returnProducts = await productServices.findAllService();

    expect(returnProducts).to.deep.equal(productsDB);
  });

  it('Teste se encontra o produto pelo id', async function () {
    sinon.stub(productModel, 'findByIdModel').resolves([[productId]]);

    const returnIdProduct = await productServices.findByIdService(1)

    expect(returnIdProduct).to.deep.equal(productId);
  })
});
