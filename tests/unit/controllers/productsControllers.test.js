const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');


const { productsDB, productId } = require('../../mocks/productsMock');

const productControllers = require('../../../src/controllers/productsController');
const productServices = require('../../../src/services/productServices');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes unitários da pasta controllers', function () {
  it('Teste se retorna todos os produtos', async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productServices, 'findAllService').resolves(productsDB);

    await productControllers.findAllController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsDB);

  });

  it('Teste se retorna todos os produtos', async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      }
    };

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();
    sinon.stub(productServices, 'findByIdService').resolves(productId);

    await productControllers.findByIdController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.send).to.have.been.calledWith(productId);

  });

  it('Teste se um novo produto é adicionado', async function () {
    const res = {};
    const req = {
      body: {
        name: 'Martelo do Thor',
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productServices, 'insertProductService').resolves(productId);

    await productControllers.insertProductController(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productId);
  });

  it('Teste se um produto é atualizado', async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Martelo de Thor',
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productServices, 'updateProductService').resolves({
      statusCode: 200,
      message: {
        id: 1,
        name: 'Teia do Aranha'
      }
    });

    await productControllers.updateProductController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      id: 1,
      name: 'Teia do Aranha'
    });
  });

  it('Teste se um produto é deletado', async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productServices, 'deleteProductService').resolves({
      statusCode: 204,
      message: {
        deletedProduct: productId,
      },
    });

    await productControllers.deleteProductController(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({
      deletedProduct: productId,
    });
  });

  afterEach(sinon.restore);
});
