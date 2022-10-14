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
  });

  it('Teste se um novo produto é adicionado', async function () {
    const output = {
      id: 4,
      name: 'Novo produto',
    };

    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    sinon.stub(productModel, 'insertProductModel').resolves(output);

    const insertTest = await productServices.insertProductService('Novo produto');

    expect(insertTest).to.deep.equal(output);

  });

  it('Teste se o produto é atualizado', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([[productId]])
      .onSecondCall().resolves([{ affectedRows: 1 }]);
    
    sinon.stub(productServices, 'findByIdService').resolves(productId);
    sinon.stub(productModel, 'updateProductModel').resolves(1);

    const result = await productServices.updateProductService(1, 'Teia do Aranha');

    expect(result).to.deep.equal({
      statusCode: 200,
      message: {
        id: 1,
        name: 'Teia do Aranha'
      }
    })
  });

  it('Teste se o produto é excluído', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([[productId]])
      .onSecondCall().resolves([{ affectedRows: 1 }]);

    sinon.stub(productModel, 'deleteProductModel').resolves(1);

    const result = await productServices.deleteProductService(1);

    expect(result).to.deep.equal({
      statusCode: 204,
      message: {
        deletedProduct: productId,
      },
    })
  });

  afterEach(sinon.restore);
});
