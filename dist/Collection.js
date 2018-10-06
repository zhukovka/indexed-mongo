"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cursor_1 = require("./Cursor");
class Collection {
    constructor(store, idb) {
        this.store = store;
        this.idb = idb;
    }
    /**
     *
     * @param docs
     * @param options
     */
    insertOne(docs, options) {
        return this.insertMany([docs], options).then(res => ({ insertedCount: 1, insertedId: res.insertedIds[0] }));
    }
    insertMany(docs, options) {
        return new Promise((resolve, reject) => {
            let insertedIds = [];
            let transaction = this.idb.transaction(this.store.name, "readwrite");
            // To determine if the add operation has completed successfully,
            // listen for the transaction’s complete event in addition to the
            // IDBObjectStore.add request’s success event,
            // because the transaction may still fail after the success event fires.
            transaction.oncomplete = e => {
                if (insertedIds.length === docs.length) {
                    resolve({ insertedCount: insertedIds.length, insertedIds });
                }
                else {
                    reject("No success");
                }
            };
            transaction.onerror = reject;
            const objectStore = transaction.objectStore(this.store.name);
            for (const doc of docs) {
                // Make a request to add docs object to the object store
                const objectStoreRequest = objectStore.add(doc);
                objectStoreRequest.onerror = reject;
                objectStoreRequest.onsuccess = (event) => {
                    // The result of a request generated from a call to add()
                    // is the key of the value that was added.
                    insertedIds.push(objectStoreRequest.result);
                };
            }
        });
    }
    /**
     *
     * @param query[optional]
     * The find() method with no parameters returns all documents from a collection and returns all fields for the documents.
     */
    find(query) {
        const transaction = this.idb.transaction(this.store.name);
        const objectStore = transaction.objectStore(this.store.name);
        //TODO: process the query
        //The getAll() method of the IDBObjectStore interface returns an IDBRequest object
        // containing all objects in the object store matching the specified parameter or
        // all objects in the store if no parameters are given.
        const request = objectStore.getAll();
        return new Cursor_1.Cursor(request);
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map