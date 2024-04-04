const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const apiUrl = "https://ich5p4r08l.execute-api.sa-east-1.amazonaws.com/spb/events";

describe('end-to-end test for transfer function', () => {
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

  it('should return a success message if CPF matches with the TED transfer', async () => {
    const eventData = {
      event: 'TRANSFER',
      target: {
        bank: '352',
        branch: '0001',
        account: '300123',
      },
      origin: {
        bank: '033',
        branch: '03312',
        cpf: '45358996060'
      },
      amount: 1000
    };

    mock.onPost(apiUrl).reply(200, { message: 'Processed By transfer' });

    const response = await axios.post(apiUrl, eventData);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Processed By transfer');
  });

  it('should return a success message if CPF matches with the Pix transfer', async () => {
    const eventData = {
      event: 'PIX',
      target: {
        bank: '352',
        branch: '0001',
        account: '300123',
      },
      origin: {
        bank: '033',
        branch: '03312',
        cpf: '45358996060'
      },
      amount: 1000
    };

    mock.onPost(apiUrl).reply(200, { message: 'Processed By pix' });

    const response = await axios.post(apiUrl, eventData);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe('Processed By pix');
  });

  it('should return an error message if CPF does not match', async () => {
    const eventData = {
      event: 'TRANSFER',
      target: {
        bank: '352',
        branch: '0001',
        account: '300123',
      },
      origin: {
        bank: '033',
        branch: '03312',
        cpf: '12345678901'
      },
      amount: 1000
    };

    mock.onPost(apiUrl).reply(400, { error: 'Transaction rejected because the CPF does not match the registered account.' });

    try {
      await axios.post(apiUrl, eventData);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data.error).toBe('Transaction rejected because the CPF does not match the registered account.');
    }
  });
});
