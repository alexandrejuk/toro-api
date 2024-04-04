const { transfer } = require('../../../transfer/transfer')
const connDb = require('../../../database/db')

jest.mock('../../../database/db')

describe('transfer function', () => {
  let customer

  beforeEach(() => {
    customer = {
      _id: '660d9bc631d2a55b5db5083a',
      cpf: '45358996060',
      account: '300123',
      checkingAccountAmount: 1000,
      positions: [
        {
          symbol: 'SANB11',
          currentPrice: 40.77,
          amount: 156
        }
      ]
    }

    connDb.mockResolvedValue({ 
      collection: jest.fn().mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValueOnce(customer),
        findOneAndUpdate: jest.fn(),
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a success message if CPF matches with the TED transfer', async () => {
    const event = {
      body: JSON.stringify({
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
      })
    }

    const response = await transfer(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('processed By transfer')
  })

  it('should return a success message if CPF matches with the Pix transfer', async () => {
    const event = {
      body: JSON.stringify({
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
      })
    }

    const response = await transfer(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('processed By pix')
  })

  it('should return an error message if CPF does not match', async () => {
    const event = {
      body: JSON.stringify({
        event: 'TRANSFER',
        target: {
          bank: '352',
          branch: '0001',
          account: '300123',
        },
        origin: {
          bank: '033',
          branch: '03312',
          cpf: '98765432101'
        },
        amount: 1000
      })
    }

    const response = await transfer(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('transaction rejected because the CPF does not match the registered account.')
  })

  it('should return an internal server error if body is invalid JSON', async () => {
    const event = {
      body: '{}'
    }

    const response = await transfer(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('internal Server Error')
  })
})
