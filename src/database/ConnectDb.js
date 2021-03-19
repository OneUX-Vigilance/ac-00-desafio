const { MongoError, MongoClient } = require("mongodb");
const result = require('dotenv').config()
 
if (result.error) {
  throw result.error
}
 
const Client = new MongoClient(result.parsed.ATLASURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
async function connectDB() {
  try {
    await Client.connect();
    console.log("Database 100%")
  } catch (e) {
    console.error(e);
  }
  if (Client.isConnected()) {
    return Client;
  }
}
module.exports = {
  connectDB,
  Client,
};