const { pathOr } = require('ramda')
const connDb = require('../database/db')
const handleResponse = require('../utils')
const collectionName = 'customers'

module.exports.transfer = async (event) => {
  try {
    const db = await connDb()
    const collection = db.collection(collectionName)
    const eventData = JSON.parse(pathOr({}, ['body'], event))
    const customer = await collection.findOne({
      account: eventData.target.account,
    })
    if (eventData.origin && eventData.origin.cpf === customer.cpf) {
      const checkingAccountAmount = (
        customer.checkingAccountAmount + eventData.amount
      )

      await collection.findOneAndUpdate(
        { account: eventData.target.account },
        { $set: { checkingAccountAmount } },
      )

      return handleResponse(
        200,
        { message: `processed By ${eventData.event.toLowerCase()}` },
      )
    } else {
      return handleResponse(
        400,
        /* eslint-disable max-len */
        { message: 'transaction rejected because the CPF does not match the registered account.' },
      )
    }
  } catch (error) {
    return handleResponse(500, { message: 'internal Server Error' })
  }
}
