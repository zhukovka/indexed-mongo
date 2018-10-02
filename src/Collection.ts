export interface CollectionCreateOptions {

}

export interface CollectionInsertOneOptions {

}

export interface InsertOneWriteOpResult {
    insertedCount: number;
    insertedId: any;
}

export class Collection {
    constructor (private store: IDBObjectStore, private idb: IDBDatabase) {

    }

    /**
     *
     * @param docs
     * @param options
     */
    insertOne (docs: Object, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult> {
        return new Promise<InsertOneWriteOpResult>((resolve, reject) => {
            let success = false;
            let transaction = this.idb.transaction(this.store.name, "readwrite");

            // To determine if the add operation has completed successfully,
            // listen for the transaction’s complete event in addition to the
            // IDBObjectStore.add request’s success event,
            // because the transaction may still fail after the success event fires.
            transaction.oncomplete = e => {
                if (success) {
                    resolve({insertedCount : 1, insertedId : 1});
                } else {
                    reject("No success");
                }
            };
            transaction.onerror = reject;

            const objectStore = transaction.objectStore(this.store.name);
            // Make a request to add docs object to the object store
            const objectStoreRequest = objectStore.add(docs);

            objectStoreRequest.onerror = reject;
            objectStoreRequest.onsuccess = (event) => {
                // report the success of our request
                success = true;
            };
        });
    }
}