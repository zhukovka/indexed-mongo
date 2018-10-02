import {Collection, CollectionCreateOptions} from "./Collection";

export class Db {
    private collectionQueue: Set<string> = new Set<string>();
    private DBOpenRequest: IDBOpenDBRequest;

    static open (name: string): Promise<Db> {

        const DBOpenRequest = self.indexedDB.open(name);

        return new Promise<Db>((resolve, reject) => {

            // these two event handlers act on the database being opened
            // successfully, or not
            DBOpenRequest.onerror = reject;

            DBOpenRequest.onsuccess = function (event) {
                // store the result of opening the database in the db
                // variable. This is used a lot later on, for opening
                // transactions and suchlike.
                let db: IDBDatabase = DBOpenRequest.result;
                resolve(new Db(db));
            };
        });
    }

    constructor (private idb: IDBDatabase) {

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
    createCollection (name: string, options: IDBObjectStoreParameters = {autoIncrement : true}): Promise<Collection> {
        console.log(`create collection ${name}`);
        if (!this.collectionQueue.size && !this.DBOpenRequest) {
            this.DBOpenRequest = self.indexedDB.open(name, this.idb.version + 1);
        }
        this.collectionQueue.add(name);
        return new Promise<Collection>((resolve, reject) => {
            // these two event handlers act on the database being opened
            // successfully, or not
            this.DBOpenRequest.addEventListener('error', reject);

            this.DBOpenRequest.addEventListener('upgradeneeded', e => {
                let db: IDBDatabase = this.DBOpenRequest.result;
                this.idb = db;
                console.log(`upgradeneeded ${name}, collectionQueue ${this.collectionQueue.size}`);
                const store = db.createObjectStore(name, options);

                // Use transaction oncomplete to make sure the objectStore creation is
                // finished before adding data into it.
                let transaction = store.transaction;
                transaction.addEventListener('complete', (event) => {
                    let collection = new Collection(store, this.idb);
                    console.log("store.transaction.oncomplete", db.version);
                    this.collectionQueue.delete(name);
                    resolve(collection);
                });
            });

            this.DBOpenRequest.onsuccess = e => {
                if (!this.collectionQueue.size && this.DBOpenRequest) {
                    this.DBOpenRequest = null;
                } else {
                    throw new Error("Not all collections were created");
                }
            }
        });
    }
}