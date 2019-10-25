const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/"; // local momgodb
const my_db = "my_library";
const booksCollection = "books";

function handleDelete(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
        res.sendStatus(500);
        return;
      };

    // --- todo check first if document exist if not send 404 and return  

    var dbo = db.db(my_db);
    var myquery = { _id: new mongodb.ObjectID(req.params.id)  };
    dbo.collection(booksCollection).deleteOne(myquery, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      };
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
    var dbo = db.db(my_db);
    // --- expecting : name , pages , isNew
    var bookObj = req.body;
    dbo.collection(booksCollection).insertOne(bookObj, function(err, result) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      console.log(result);
      // --- todo : might send also the created object
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

    let dbo = db.db(my_db);
    dbo
      .collection(booksCollection)
      .find({})
      .toArray(function(err, books) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.send(books);
        db.close();
      });
  });
}

module.exports.handleGet = handleGet;
module.exports.handlePost = handlePost;
module.exports.handleDelete = handleDelete;
