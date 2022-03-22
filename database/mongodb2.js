var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://localhost:27017/${process.env.DB2}`

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // console.log("Database created!");
  db.close();
});

module.exports= {MongoClient, url}