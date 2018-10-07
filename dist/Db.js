"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
class Db {
    constructor(idb) {
        this.idb = idb;
        this.collectionQueue = new Set();
    }
    static open(name, collections) {
        const DBOpenRequest = self.indexedDB.open(name);
        return new Promise((resolve, reject) => {
            // these two event handlers act on the database being opened
            // successfully, or not
            DBOpenRequest.addEventListener('error', reject);
            DBOpenRequest.addEventListener('success', function (event) {
                // store the result of opening the database in the db
                // variable. This is used a lot later on, for opening
                // transactions and suchlike.
                let db = new Db(DBOpenRequest.result);
                resolve(db);
            });
            DBOpenRequest.onblocked = (e) => {
                console.log('blocked');
            };
            //
        });
    }
    get version() {
        return this.idb ? this.idb.version : 0;
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
        if (this.idb.objectStoreNames.contains(name)) {
            throw new Error("Collection already exists");
        }
        if (!this.collectionQueue.size && !this.DBOpenRequest) {
            let v = this.version + 1;
            this.idb.close();
            this.DBOpenRequest = self.indexedDB.open(this.idb.name, v);
        }
        this.collectionQueue.add(name);
        return new Promise((resolve, reject) => {
            // these two event handlers act on the database being opened
            // successfully, or not
            this.DBOpenRequest.addEventListener('error', reject);
            this.DBOpenRequest.addEventListener('upgradeneeded', e => {
                let db = this.DBOpenRequest.result;
                this.idb = db;
                //This method can be called only within a versionchange transaction.
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