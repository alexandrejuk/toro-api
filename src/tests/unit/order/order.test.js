const { order } = require('../../../order/order')
const connDb = require('../../../database/db')

jest.mock('../../../database/db')

describe('order function', () => {
  let customer, stock, event

  beforeEach(() => {
    customer = {
      _id: '660d9bc631d2a55b5db5083a',
      checkingAccountAmount: 1000
    }

    stock = {
      symbol: 'TORO4',
      currentPrice: 115.98
    }

    event = {
      body: JSON.stringify({
        customerId: '660d9bc631d2a55b5db5083a',
        symbol: 'TORO4',
        amount: 5
      })
    }

    connDb.mockResolvedValue({ 
      collection: jest.fn().mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValueOnce(customer),
        findOneAndUpdate: jest.fn(),
      })
        .mockReturnValueOnce({
          findOne: jest.fn().mockResolvedValueOnce(stock)
        })
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should return success message if order is processed successfully', async () => {    
    const response = await order(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('your request has been successfully processed.')
  })

  it('should return error message if order is not processed successfully due to insufficient balance', async () => {
    const customer = {
      _id: '660d9bc631d2a55b5db5083a',
      checkingAccountAmount: 100
    }

    connDb.mockResolvedValue({ 
      collection: jest.fn().mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValueOnce(customer),
      })
        .mockReturnValueOnce({
          findOne: jest.fn().mockResolvedValueOnce(stock)
        })
    })

    const response = await order(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('insufficient balance. Purchase cannot be made.')
  })

  it('should return an error message if the order has an invalid customer ID or stock symbol.', async () => {
    const customer = null
    
    connDb.mockResolvedValue({ 
      collection: jest.fn().mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValueOnce(customer),
      })
        .mockReturnValueOnce({
          findOne: jest.fn().mockResolvedValueOnce(stock)
        })
    })

    const response = await order(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('invalid customer ID or stock symbol.')
  })

  it('should return error message if order is not processed successfully due to internal Server Error', async () => {
    connDb.mockResolvedValue({ 
      collection: jest.fn().mockReturnValueOnce({})
    })

    const response = await order(event)
    const responseBody = JSON.parse(response.body)

    expect(responseBody.message).toEqual('internal Server Error')
  })
})
