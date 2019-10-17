const my_mongodb = require('./my_mongodb');
const connectedDb = my_mongodb.connectedDb;

connectedDb 
 .then(db => {
    console.log("Database connect ok !!!"); 
    db.close(); // -- close db and connection
 })
 .catch(err => {
     throw err;
 });
