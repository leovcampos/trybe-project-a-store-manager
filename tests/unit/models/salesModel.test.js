const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModels');
const { salesReqBodyMock, salesFromDb, saleFromDbById} = require('../../mocks/salesMock');

describe('Testes unitários da camada model de sales', function () {
    it('Teste se lista todas as sales', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDb]);

        const result = await salesModel.findAllSalesModel();
        expect(result).to.deep.equal(salesFromDb);
    });

    it('Teste se é possível buscar uma sale pelo id', async function () {
        sinon.stub(connection, 'execute').resolves(saleFromDbById);

        const result = await salesModel.findByIdSaleModel(1);
        expect(result).to.deep.equal(saleFromDbById);
    });

    it('Teste se é possível inserir uma nova sale', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

        const result = await salesModel.insertSaleModel();
        expect(result).to.equal(1);
    });

    it('Teste se é possível atualizar uma sale', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

        const result = await salesModel.updateSaleModel(1);
        expect(result).to.equal(1);
    });

    it('Teste se é possível deletar uma sale', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

        const result = await salesModel.deleteSaleModel(1);
        expect(result).to.equal(1);
    });

    afterEach(sinon.restore);
});
