const { expect } = require('chai');
const axios = require('axios');

const apiUrl = "https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/trends"

describe('end-to-end test for top5Stocks function', () => {
  it('should return the top 5 stocks', async () => {
    try {
      const response = await axios.get(apiUrl);
      expect(response.status).to.equal(200);
      expect(response.data).to.be.an('array');
      expect(response.data).to.have.lengthOf(5);
      expect(response.data[0]).to.have.property('symbol');
      expect(response.data[0]).to.have.property('currentPrice');
    } catch (error) {
      throw new Error(error);
    }
  });
});
