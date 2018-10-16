"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IndexedClient_1 = require("../IndexedClient");
/*
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  // Create a collection we want to drop later
  const col = client.db(dbName).collection('createIndexExample1');
  // Show that duplicate records got dropped
  col.find({}).toArray(function(err, items) {
    test.equal(null, err);
    test.equal(4, items.length);
    client.close();
  });
});
* */
IndexedClient_1.IndexedClient.connect("example").then(function (client) {
    const db = client.db;
    if (db.version == 1) {
        // Create a collection
        Promise.all([
            db.createCollection("a_simple_collection").then(function (collection) {
                // Insert a document in the collection
                collection.insertOne({ a: 1 }).then(function (r) {
                    // Finish up test
                    console.log("a_simple_collection", r);
                });
            }),
            db.createCollection("another_collection").then(function (collection) {
                // Insert a document in the collection
                collection.insertMany([{ b: 2 }, { c: 3 }, { d: 4 }]).then(function (r) {
                    // Finish up test
                    console.log("another_collection", r);
                });
            })
        ]).then(res => {
            const c = db.collection("another_collection");
            c.find().toArray().then(values => {
                console.log(values);
                client.close();
            });
        });
    }
    else {
        const c = db.collection("another_collection");
        c.find().toArray().then(values => {
            console.log(values);
            client.close();
        });
    }
});
//# sourceMappingURL=index.js.map