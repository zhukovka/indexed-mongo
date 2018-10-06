"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
class Db {
    constructor(idb) {
        this.idb = idb;
        this.collectionQueue = new Set();
    }
    static open(name) {
        const DBOpenRequest = self.indexedDB.open(name);
        return new Promise((resolve, reject) => {
            // these two event handlers act on the database being opened
            // successfully, or not
            DBOpenRequest.onerror = reject;
            DBOpenRequest.onsuccess = function (event) {
                // store the result of opening the database in the db
                // variable. This is used a lot later on, for opening
                // transactions and suchlike.
                let db = DBOpenRequest.result;
                resolve(new Db(db));
            };
        });
    }
    /**
     *
     * @param name
     * @param options -  Optional
     * An options object whose attributes are optional parameters to the method. It includes the following properties:
     * | Attribute          | Description       |
     * | ---------------- | ---------------   |
     * | keyPath          | The key path to be used by the new object store. If empty or not specified, the object store is created without a key path and uses out-of-line keys. You can also pass in an array as a keyPath. |
     * | autoIncrement    | If true, the object store has a key generator. Defaults to false. |
     * Unknown parameters are ignored.
     */
    createCollection(name, options = { autoIncrement: true }) {
        if (!this.collectionQueue.size && !this.DBOpenRequest) {
            this.DBOpenRequest = self.indexedDB.open(name, this.idb.version + 1);
        }
        this.collectionQueue.add(name);
        return new Promise((resolve, reject) => {
            // these two event handlers act on the database being opened
            // successfully, or not
            this.DBOpenRequest.addEventListener('error', reject);
            this.DBOpenRequest.addEventListener('upgradeneeded', e => {
                let db = this.DBOpenRequest.result;
                this.idb = db;
                const store = db.createObjectStore(name, options);
                // Use transaction oncomplete to make sure the objectStore creation is
                // finished before adding data into it.
                let transaction = store.transaction;
                transaction.addEventListener('complete', (event) => {
                    let collection = new Collection_1.Collection(store, this.idb);
                    this.collectionQueue.delete(name);
                    resolve(collection);
                });
            });
            this.DBOpenRequest.onsuccess = e => {
                if (!this.collectionQueue.size && this.DBOpenRequest) {
                    this.DBOpenRequest = null;
                }
                else {
                    throw new Error("Not all collections were created");
                }
            };
        });
    }
    collection(name) {
        if (this.idb.objectStoreNames.contains(name)) {
            const store = this.idb.transaction(name).objectStore(name);
            return Promise.resolve(new Collection_1.Collection(store, this.idb));
        }
        return Promise.reject("No such collection");
    }
}
exports.Db = Db;
//# sourceMappingURL=Db.js.map