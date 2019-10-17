// --- following few lines simply helps me test insert code
if (process.argv.length != 4) {
  throw "Expecting description and amount from the command line";
}

const description = process.argv[2];
const amount = Number(process.argv[3]);

const constants = require("./constants"),
  my_mongodb = require("./my_mongodb"),
  connectedDb = my_mongodb.connectedDb;

// --- TBD concat promises ???
connectedDb
  .then(db => {
    const dbObject = db.db(connectedDb.dbName);
    const incomesCollection = dbObject.collection(constants.incomesCollection);
    incomesCollection
      .insertOne({ description: description, amount: amount })
      .then(result => {
        console.log("insert is success", result);
        db.close(); // -- close db and connection
      })
      .catch(err => {
        throw err;
      });
  })
  .catch(err => {
    throw err;
  });
