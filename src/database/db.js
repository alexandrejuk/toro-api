require('dotenv').config();
const { MongoClient } = require('mongodb');

let instanceDb = null;

async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI;
    if (instanceDb) {
      return instanceDb;
    }

    const client = await MongoClient.connect(uri);
    const db = client.db();

    instanceDb = db;
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
