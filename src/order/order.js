const { ObjectId } = require('mongodb');
const connDb = require('../database/db');
const { customerPosition, checkBalanceAvailability } = require('./utils');

const collectionName = 'customers';
const collectionStockName = 'stocks';

module.exports.order = async (event) => {
  try {
    const db = await connDb();
    const collection = db.collection(collectionName);
    const collectionStock = db.collection(collectionStockName);
    const order = JSON.parse(event.body || '{}');
    const customerId = order.customerId;
    const filter = { _id: new ObjectId(customerId) };

    
    const [customer, stock] = await Promise.all([
      collection.findOne(filter),
      collectionStock.findOne({ symbol: order.symbol })
    ]);
    
    if (!customer || !stock) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'invalid customer ID or stock symbol.' }),
      };
    }
    
    if (checkBalanceAvailability(customer.checkingAccountAmount, { stock, order })) {
      await collection.findOneAndUpdate(filter, { $set: customerPosition({ customer, stock, order }) });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'your request has been successfully processed.' }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'insufficient balance. Purchase cannot be made.' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'internal error' }),
    };
  }
};
