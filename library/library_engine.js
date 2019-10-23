const dbName = "my_library",
  booksCollection = "books";
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

function handlePatch(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var dbo = db.db(dbName);
    const _id = req.params.id;

    // --- notice ObjectID is required
    var myquery = { _id: new mongodb.ObjectID(_id) };
    const myobj = req.body;

    var newvalues = { $set: myobj };
    dbo
      .collection(booksCollection)
      .updateOne(myquery, newvalues, function(err, result) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        // --- todo , need to check result to see if it is actually deleted
        console.log(result);
        res.sendStatus(200);
        db.close();
      });
  });
}

function handleDelete(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var dbo = db.db(dbName);
    const _id = req.params.id;

    // --- notice ObjectID is required
    var myquery = { _id: new mongodb.ObjectID(_id) };

    // console.log(_id);
    dbo.collection(booksCollection).deleteOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      // --- todo , need to check result to see if it is actually deleted
      // --- because what if id is not found ?????
      console.log(result);
      res.sendStatus(200);
      db.close();
    });
  });
}

function handlePost(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const dbo = db.db(dbName);
    const myobj = req.body;
    dbo.collection(booksCollection).insertOne(myobj, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      console.log(result);
      // --- todo : send also created object !!!
      // --- todo , need to check result to see if it is actually done
      res.sendStatus(201);
      db.close();
    });
  });
}

function handleGet(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const dbo = db.db(dbName);
    dbo
      .collection(booksCollection)
      .find({})
      .toArray(function(err, result) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.send(result);
        db.close();
      });
  });
}

module.exports.handleGet = handleGet;
module.exports.handlePost = handlePost;
module.exports.handleDelete = handleDelete;
module.exports.handlePatch = handlePatch;
