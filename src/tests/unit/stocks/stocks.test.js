const { stocks } = require('../../../stocks/stocks');
const connDb = require('../../../database/db');

jest.mock('../../../database/db');

describe('stocks function', () => {
  let top5Stocks;

  beforeEach(() => {
    top5Stocks = [
      { _id: "660d97e431d2a55b5db50835", symbol: "PETR4", currentPrice: 28.44 },
      { _id: "660d983b31d2a55b5db50836", symbol: "MGLU3", currentPrice: 25.91 },
      { _id: "660d985131d2a55b5db50837", symbol: "VVAR3", currentPrice: 25.91 },
      { _id: "660d985e31d2a55b5db50838", symbol: "SANB11", currentPrice: 40.77 },
      { _id: "660d986d31d2a55b5db50839", symbol: "TORO4", currentPrice: 115.98 }
    ];

    connDb.mockResolvedValueOnce({ 
      collection: jest.fn().mockReturnValueOnce({
        find: jest.fn().mockReturnValueOnce({
          toArray: jest.fn().mockResolvedValueOnce(top5Stocks),
        }),
      })
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object with a body property that is an array with 5 elements', async () => {
    const response = await stocks();
    const responseBody = JSON.parse(response.body);

    expect(response).toEqual(expect.objectContaining({
      body: expect.any(String)
    }));

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody).toHaveLength(5);
  });

  it('should have correct properties in each element', async () => {
    const response = await stocks();
    const responseBody = JSON.parse(response.body);
    
    responseBody.forEach(stock => {
      expect(stock).toEqual(expect.objectContaining({
        _id: expect.any(String),
        symbol: expect.any(String),
        currentPrice: expect.any(Number)
      }));
    });
  });

  it('should have valid currentPrice for each stock', async () => {
    const response = await stocks();
    const responseBody = JSON.parse(response.body);

    responseBody.forEach(stock => {
      expect(typeof stock.currentPrice).toBe('number');
      expect(stock.currentPrice).toBeGreaterThan(0);
    });
  });
});
