const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModels');

const { productsDB, productId } = require('../../mocks/productsMock');

describe('Testes unitários da pasta models', function () {
  it('Teste se retorna todos os produtos', async function () {
    const output = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ];
    sinon.stub(connection, 'execute').resolves(productsDB);

    const result = await productModel.findAllModel();

    expect(result).to.deep.equal(output);
  });

  it('Teste retorno a partir do id', async function () {
    const output = {
      id: 1,
      name: 'Martelo de Thor',
    }
    sinon.stub(connection, 'execute').resolves(productId);

    const result = await productModel.findByIdModel(1);
    expect(result).to.deep.equal(output);
  })

  it('Teste se insere um novo produto', async function () {
    const output = {
      id: 5,
      name: 'Novo produto',
    };

    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 5 }])
      .onSecondCall().resolves([[output]])
    sinon.stub(productModel, 'findByIdModel').resolves([[output]]);

    const result = await productModel.insertProductModel('Novo produto');
    expect(result).to.deep.equal(output);
  });

  afterEach(sinon.restore);
});