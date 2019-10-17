const mongo = require("mongodb");
const dbName = 'my_budget'
const mongoDbUrl = `mongodb://localhost:27017/${dbName}`;
const mongoClient = mongo.MongoClient;

const connectedDb = mongoClient.connect(
 mongoDbUrl,
 { useUnifiedTopology: true }
);

module.exports.connectedDb = connectedDb;
module.exports.dbName = dbName;