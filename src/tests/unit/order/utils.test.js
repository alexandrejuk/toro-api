const { customerPosition, checkBalanceAvailability } = require('../../../order/utils')

describe('customerPosition', () => {
  it('should build position with existing stock', () => {
    const customer = {
      positions: [
        { symbol: 'MGLU3', currentPrice: 25.91, amount: 10 },
        { symbol: 'PETR4', currentPrice: 28.44, amount: 20 }
      ]
    }
    const stock = { symbol: 'MGLU3', currentPrice: 32 }
    const order = { symbol: 'MGLU3', amount: 5 }

    const newPosition = customerPosition({ customer, stock, order })

    expect(newPosition.positions).toEqual([
      { symbol: 'MGLU3', currentPrice: 27.94, amount: 15 },
      { symbol: 'PETR4', currentPrice: 28.44, amount: 20 }
    ])
  })

  it('should build position with new stock', () => {
    const customer = {
      positions: [
        { symbol: 'MGLU3', currentPrice: 25.91, amount: 10 },
        { symbol: 'PETR4', currentPrice: 28.44, amount: 20 }
      ]
    }
    const stock = { symbol: 'TORO4', currentPrice: 115.98 }
    const order = { symbol: 'TORO4', amount: 15 }

    const newPosition = customerPosition({ customer, stock, order })

    expect(newPosition.positions).toEqual([
      { symbol: 'MGLU3', currentPrice: 25.91, amount: 10 },
      { symbol: 'PETR4', currentPrice: 28.44, amount: 20 },
      { symbol: 'TORO4', currentPrice: 115.98, amount: 15 }
    ])
  })
})

describe('checkBalanceAvailability', () => {
  it('should return true if balance is available', () => {
    const checkingAccountAmount = 1000
    const obj = { order: { amount: 5 }, stock: { currentPrice: 200 } }

    const result = checkBalanceAvailability(checkingAccountAmount, obj)

    expect(result).toBe(true)
  })

  it('should return false if balance is not available', () => {
    const checkingAccountAmount = 100
    const obj = { order: { amount: 5 }, stock: { currentPrice: 200 } }

    const result = checkBalanceAvailability(checkingAccountAmount, obj)

    expect(result).toBe(false)
  })
})
