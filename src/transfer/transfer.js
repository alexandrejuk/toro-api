const connDb = require('../database/db');
const collectionName = "customers"

module.exports.transfer = async (event) => {
  try {
    const db = await connDb()
    const collection = db.collection(collectionName);
    const eventData = JSON.parse(event.body || '{}');
    const customer = await collection.findOne({ account: eventData.target.account })
    if (eventData.origin && customer.cpf && eventData.origin.cpf === customer.cpf) {
      const checkingAccountAmount = customer.checkingAccountAmount + eventData.amount
      await collection.findOneAndUpdate({ account: eventData.target.account }, { $set: { checkingAccountAmount } });
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: `processed By ${eventData.event.toLowerCase()}` }),
      };

      return response;
    } else {
      const response = {
        statusCode: 400,
        body: JSON.stringify({ error: 'transaction rejected because the CPF does not match the registered account.' }),
      };
      return response;
    }
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'internal Server Error' }),
    };

    return response;
  }
};