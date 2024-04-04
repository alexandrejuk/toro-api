const connDb = require('../database/db')
const handleResponse = require('../utils')
const collectionName = 'stocks'

module.exports.stocks = async () => {
  const db = await connDb()
  const collection = db.collection(collectionName)
  const trends = await collection.find({}).toArray()
  return handleResponse(200, trends)
}
