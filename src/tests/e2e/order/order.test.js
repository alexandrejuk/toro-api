const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const apiUrl = "https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/orders";

describe('end-to-end test for order function', () => {
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

  it('should return a success message if the order is processed successfully', async () => {
    const eventData = {
      symbol: "TORO4",
      amount: 3,
      customerId: "660d9bc631d2a55b5db5083a"
    };

    mock.onPost(apiUrl).reply(200, { message: 'your request has been successfully processed.' });

    const response = await axios.post(apiUrl, eventData);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('your request has been successfully processed.');
  });
});
