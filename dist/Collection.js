"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cursor_1 = require("./Cursor");
const SINGLE = true;
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
    getCursor(query, operation = Cursor_1.CursorOperation.READ, single = false, update = null) {
        const mode = operation == Cursor_1.CursorOperation.READ ? "readonly" : "readwrite";
        const transaction = this.idb.transaction(this.store.name, mode);
        const objectStore = transaction.objectStore(this.store.name);
        return new Cursor_1.Cursor(objectStore, query, operation, single, update);
    }
    /**
     *
     * @param query[optional]
     * The find() method with no parameters returns all documents from a collection and returns all fields for the documents.
     */
    find(query) {
        return this.getCursor(query, Cursor_1.CursorOperation.READ, false);
    }
    delete(filter, options, single) {
        let cursor = this.getCursor(filter, Cursor_1.CursorOperation.DELETE, single);
        return cursor.getResult().then(deleted => {
            return {
                result: {
                    //Is 1 if the command executed correctly.
                    ok: 1,
                    //The total count of documents deleted.
                    n: deleted.length
                },
                //The number of documents deleted.
                deletedCount: deleted.length
            };
        });
    }
    update(filter, update, options, single) {
        let cursor = this.getCursor(filter, Cursor_1.CursorOperation.UPDATE, single, update);
        return cursor.getResult().then(updated => {
            return {
                result: { ok: 1, n: updated.length, nModified: updated.length },
                connection: null,
                matchedCount: updated.length,
                modifiedCount: updated.length,
                upsertedCount: updated.length,
                upsertedId: { _id: null }
            };
        });
    }
    deleteMany(filter, options) {
        return this.delete(filter, options);
    }
    deleteOne(filter, options) {
        return this.delete(filter, options, SINGLE);
    }
    updateMany(filter, update, options) {
        return this.update(filter, update, options);
    }
    updateOne(filter, update, options) {
        return this.update(filter, update, options, SINGLE);
    }
}
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map