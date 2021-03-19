const db_main = require("./ConnectDb.js");
const db =  db_main.connectDB();

const Client = db_main.Client;
module.exports = {
  Client,
  db,
};