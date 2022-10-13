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

  afterEach(sinon.restore);
});
