const connectedDb = require('./my_mongodb').connectedDb;
const constants = require('./constants');

// --- TBD concat promises !!!
connectedDb 
 .then(db => {
   const dbObject = db.db(connectedDb.dbName);
   const incomesCollection = dbObject.collection(constants.incomesCollection);
   var query = {};
    // --- find returns Cursor
    incomesCollection.find(query).toArray().then(result => {
        console.log(result); // result is incomes
        db.close(); // -- close db and connection
    }).catch(err => {
        throw err
    });
 })
 .catch(err => {
     throw err;
 });