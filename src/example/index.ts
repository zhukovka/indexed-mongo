import {IndexedClient} from "../IndexedClient";

IndexedClient.connect(name).then(function (db) {
    // Create a collection
    Promise.all([
        db.createCollection("a_simple_collection").then(function (collection) {
            // Insert a document in the collection
            collection.insertOne({a : 1}).then(function (r) {
                // Finish up test
                console.log("a_simple_collection", r);
            });
        }),
        db.createCollection("another_collection").then(function (collection) {
            // Insert a document in the collection
            collection.insertMany([{b : 2}, {c : 3}, {d : 4}]).then(function (r) {
                // Finish up test
                console.log("another_collection", r);
            });
        })]).then(res => {
        db.collection("another_collection").then(c => {
            c.find().toArray().then(values => {
                console.log(values);
            })
        })
    });
});