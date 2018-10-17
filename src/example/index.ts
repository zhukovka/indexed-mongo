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
document.getElementById("output").innerHTML = "";
IndexedClient.connect("example").then(function (client) {
    const db = client.db as Db;
    document.getElementById("output").innerHTML += `<p>DB version: ${db.version}</p>`;
    if (db.version == 1) {
        // Create a collection
        Promise.all([
            db.createCollection("a_simple_collection", {keyPath : "_id"}).then(function (collection) {
                // Insert a document in the collection
                collection.insertOne({_id : "a", a : 1}).then(function (r: any) {
                    // Finish up test
                    console.log("a_simple_collection", r);
                    document.getElementById("output").innerHTML += `<p>a_simple_collection: ${JSON.stringify(r)}</p>`;
                });
            }),
            db.createCollection("another_collection").then(function (collection) {
                // Insert a document in the collection
                collection.insertMany([{b : 2}, {c : 3}, {c : 3}, {d : 4}, {b : 2}]).then(function (r: any) {
                    // Finish up test
                    console.log("another_collection", r);
                    document.getElementById("output").innerHTML += `<p>another_collection: ${JSON.stringify(r)}</p>`;
                });
            })]).then(res => {
            find({b : 2})
        });
    } else {
        find({b : 2})
    }

    function find (q?: any) {
        const c = db.collection("another_collection");
        const output = document.getElementById("output");
        c.find(q).toArray().then((values: any) => {
            console.log(values);
            output.innerHTML += `<p>another_collection find {b : 2}: ${JSON.stringify(values)}</p>`;
        }).then(() => {
            output.innerHTML += `<p>another_collection delete all {b : 2}, delete one {c : 3}</p>`;
            return Promise.all([c.deleteMany(q), c.deleteOne({c : 3})]).then(res => {
                output.innerHTML += `<p>${JSON.stringify(res)}</p>`;
            })
        }).then(() => {
            // client.close();
        });

        const c1 = db.collection("a_simple_collection");
        const output1 = document.getElementById("output1");
        c1.find({_id : "a"}).toArray().then((values: any) => {
            console.log(values);
            output1.innerHTML += `<p>a_simple_collection find {_id : "a"}: ${JSON.stringify(values)}</p>`;
        })
    }
});

