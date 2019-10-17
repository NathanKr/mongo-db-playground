// --- following few lines simply helps me test insert code
if (process.argv.length != 3) {
  throw "Expecting _id from the command line";
}

// --- e.g. 5da8240bdc1aad0efacfed51
const _id = process.argv[2];

const mongodb = require("mongodb"),
  my_mongodb = require("./my_mongodb"),
  connectedDb = my_mongodb.connectedDb,
  constants = require("./constants");

// --- TBD concat promises ???
connectedDb
  .then(db => {
    const dbObject = db.db(connectedDb.dbName);
    const incomesCollection = dbObject.collection(constants.incomesCollection);
    incomesCollection
      .deleteOne({ _id: new mongodb.ObjectID(_id) })
      .then(result => {
        console.log(`${result.deletedCount} document was deleted`);
        db.close(); // -- close db and connection
      })
      .catch(err => {
        throw err;
      });
  })
  .catch(err => {
    throw err;
  });
