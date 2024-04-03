const { expect } = require('chai');
const { top5Stocks } = require('../../../stocks/stocks');

describe('top5Stocks function', () => {
  it('should return an object with a body property that is an array with 5 elements', async () => {
    const response = await top5Stocks();
    expect(response).to.be.an('object');
    expect(response).to.have.property('body');
    const body = JSON.parse(response.body);
    expect(body).to.be.an('array').that.has.lengthOf(5);
  });

  it('should have correct properties in each element', async () => {
    const response = await top5Stocks();
    const body = JSON.parse(response.body);
    body.forEach(stock => {
      expect(stock).to.have.all.keys('symbol', 'currentPrice');
    });
  });

  it('should have valid currentPrice for each stock', async () => {
    const response = await top5Stocks();
    const body = JSON.parse(response.body);
    body.forEach(stock => {
      expect(stock.currentPrice).to.be.a('number');
      expect(stock.currentPrice).to.be.above(0);
    });
  });
});
