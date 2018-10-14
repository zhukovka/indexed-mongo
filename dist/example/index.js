"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IndexedClient_1 = require("../IndexedClient");
IndexedClient_1.IndexedClient.connect("example").then(function (db) {
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
                db.close();
            });
        });
    }
    else {
        const c = db.collection("another_collection");
        c.find().toArray().then(values => {
            console.log(values);
            db.close();
        });
    }
});
//# sourceMappingURL=index.js.map