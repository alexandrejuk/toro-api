const { ObjectId } = require('mongodb')
const { pathOr } = require('ramda')
const connDb = require('../database/db')
const { customerPosition, checkBalanceAvailability } = require('./utils')
const handleResponse = require('../utils')

const collectionName = 'customers'
const collectionStockName = 'stocks'

module.exports.order = async (event) => {
  try {
    const db = await connDb()
    const collection = db.collection(collectionName)
    const collectionStock = db.collection(collectionStockName)
    const order = JSON.parse(pathOr({}, ['body'], event))
    const customerId = order.customerId
    const filter = { _id: new ObjectId(customerId) }

    
    const [customer, stock] = await Promise.all([
      collection.findOne(filter),
      collectionStock.findOne({ symbol: order.symbol })
    ])
    
    if (!customer || !stock) {
      return handleResponse(
        400, 
        { message: 'invalid customer ID or stock symbol.' },
      )
    }
    const isValid = checkBalanceAvailability(
      customer.checkingAccountAmount,
      { stock, order },
    )

    if (isValid) {
      const update = { customer, stock, order }
      await collection.findOneAndUpdate(
        filter,
        { $set: customerPosition(update) }
      )

      return handleResponse(
        200,
        { message: 'your request has been successfully processed.' },
      )
    } else {
      return handleResponse(
        400, 
        { message: 'insufficient balance. Purchase cannot be made.' },
      )
    }
  } catch (error) {
    return handleResponse(500, { message: 'internal Server Error' })
  }
}
