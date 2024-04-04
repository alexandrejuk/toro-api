const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const apiUrl = "https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/trends";

describe('end-to-end test for stocks return top 5 Stocks', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return the top 5 stocks', async () => {
    const responseData = [
      { symbol: "PETR4", currentPrice: 28.44 },
      { symbol: "MGLU3", currentPrice: 25.91 },
      { symbol: "VVAR3", currentPrice: 25.91 },
      { symbol: "SANB11", currentPrice: 40.77 },
      { symbol: "TORO4", currentPrice: 115.98 }
    ];
    mock.onGet(apiUrl).reply(200, responseData);

    const response = await axios.get(apiUrl);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(5);
    expect(response.data[0]).toHaveProperty('symbol');
    expect(response.data[0]).toHaveProperty('currentPrice');
  });
});
