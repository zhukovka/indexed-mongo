import {IndexedClient} from "../IndexedClient";
import {Db} from "../Db";
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

const output1 = document.getElementById("output1");
output1.innerHTML = `<h2>a_simple_collection</h2>`;

const output2 = document.getElementById("output2");
output2.innerHTML = `<h2>another_collection</h2>`;

IndexedClient.connect("example").then(function (client) {
    const db = client.db("") as Db;
    if (db.version == 1) {
        // Create a collection
        Promise.all([
            db.createCollection("a_simple_collection", {keyPath : "_id"}).then(function (collection) {
                // Insert a document in the collection
                collection.insertOne({_id : "a", a : 1}).then(function (r: any) {
                    // Finish up test
                    console.log("a_simple_collection", r);
                    output1.innerHTML += `<p>insertOne: ${JSON.stringify(r)}</p>`;
                });
            }),
            db.createCollection("another_collection").then(function (collection) {
                // Insert a document in the collection
                collection.insertMany([{b : 2}, {d : 4}, {c : 3}, {c : 3}, {d : 4}, {d : 4}, {b : 2}]).then(function (r: any) {
                    // Finish up test
                    console.log("another_collection", r);
                    output2.innerHTML += `<p>insertMany: ${JSON.stringify(r)}</p>`;
                });
            })]).then(res => {
            test()
        });
    } else {
        test()
    }

    function test () {
        const c1 = db.collection("a_simple_collection");

        c1.find({_id : "a"}).toArray().then((values: any) => {
            console.log(values);
            output1.innerHTML += `<p>find({_id : "a"}): ${JSON.stringify(values)}</p>`;
        }).then(() => {
            return Promise.all([c1.updateOne({_id : "a"}, {a : 42})]).then(res => {
                output1.innerHTML += `<p>updateOne({_id : "a"}, {a : 42})</p>`;
                output1.innerHTML += `<p>${JSON.stringify(res)}</p>`;
            })
        });


        const c2 = db.collection("another_collection");

        c2.find({b : 2}).toArray().then((values: any) => {
            console.log(values);
            output2.innerHTML += `<p>find {b : 2}: ${JSON.stringify(values)}</p>`;
        }).then(() => {
            return Promise.all([c2.updateMany({d : 4}, {db : 42}), c2.updateOne({b : 2}, {b : 42})]).then(res => {
                output2.innerHTML += `<p>updateMany({d : 4}, {db : 42}): ${JSON.stringify(res[0])}</p>`;
                output2.innerHTML += `<p>updateOne({b : 2}, {b : 42}): ${JSON.stringify(res[1])}</p>`;
            })
        })
            .then(() => {
                return Promise.all([c2.deleteMany({db : 42}), c2.deleteOne({c : 3})]).then(res => {
                    output2.innerHTML += `<p>deleteMany({db : 42}): ${JSON.stringify(res[0])}</p>`;
                    output2.innerHTML += `<p>deleteOne({c : 3}): ${JSON.stringify(res[1])}</p>`;
                })
            }).then(() => {
            // client.close();
        });


    }
});

