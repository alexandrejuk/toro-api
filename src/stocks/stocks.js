const connDb = require('../database/db');
const collectionName = "stocks"

module.exports.stocks = async (event) => {
  const db = await connDb()
  const collection = db.collection(collectionName);
  const trends = await collection.find({}).toArray();

  const response = {
    statusCode: 200,
    body: JSON.stringify(trends),
  };

  return response;
};
