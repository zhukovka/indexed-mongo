import {Cursor} from "./Cursor";

export interface CollectionCreateOptions {

}

export interface CollectionInsertOneOptions {

}

export interface InsertOneWriteOpResult {
    insertedCount: number;
    insertedId: any;
}

interface InsertWriteOpResult {
    insertedCount: number;
    insertedIds: any[];
}

//TODO: add support for operators like $eq
export type FilterQuery<T> = {
    [P in keyof T]?: T[P] | {
    $eq?: T[P];
    $gt?: T[P];
    $gte?: T[P];
    $in?: T[P][];
    $lt?: T[P];
    $lte?: T[P];
    $ne?: T[P];
    $nin?: T[P][];
    $and?: (FilterQuery<T[P]> | T[P])[];
    $or?: (FilterQuery<T[P]> | T[P])[];
    $not?: (FilterQuery<T[P]> | T[P])[] | T[P];
    $expr?: any;
    $jsonSchema?: any;
    $mod?: [number, number];
    $regex?: RegExp;
    $options?: string;
    $text?: {
        $search: string;
        $language?: string;
        $caseSensitive?: boolean;
        $diacraticSensitive?: boolean;
    };
    $where: Object;
    $geoIntersects?: Object;
    $geoWithin?: Object;
    $near?: Object;
    $nearSphere?: Object;
    $elemMatch?: Object;
    $size?: number;
    $bitsAllClear?: Object;
    $bitsAllSet?: Object;
    $bitsAnyClear?: Object;
    $bitsAnySet?: Object;
    [key: string]: any;
};
} | { [key: string]: any };

interface CommonOptions {
}

export interface DeleteWriteOpResultObject {
    //The raw result returned from MongoDB, field will vary depending on server version.
    result: {
        //Is 1 if the command executed correctly.
        ok?: number;
        //The total count of documents deleted.
        n?: number;
    }
    //The number of documents deleted.
    deletedCount?: number;
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
        return this.insertMany([docs], options).then(res => ({insertedCount : 1, insertedId : res.insertedIds[0]}));
    }

    insertMany (docs: Object[], options?: CollectionInsertOneOptions): Promise<InsertWriteOpResult> {
        return new Promise<InsertWriteOpResult>((resolve, reject) => {
            let insertedIds: any[] = [];
            let transaction = this.idb.transaction(this.store.name, "readwrite");

            // To determine if the add operation has completed successfully,
            // listen for the transaction’s complete event in addition to the
            // IDBObjectStore.add request’s success event,
            // because the transaction may still fail after the success event fires.
            transaction.oncomplete = e => {
                if (insertedIds.length === docs.length) {
                    resolve({insertedCount : insertedIds.length, insertedIds});
                } else {
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
    find<T> (query?: FilterQuery<T>): Cursor<T> {
        const transaction = this.idb.transaction(this.store.name);
        const objectStore = transaction.objectStore(this.store.name);
        //TODO: process the query
        // The getAll() method of the IDBObjectStore interface returns an IDBRequest object
        // containing all objects in the object store matching the specified parameter or
        // all objects in the store if no parameters are given.
        let request: any;
        if (!query) {
            request = objectStore.getAll();
        } else {
            request = objectStore.openCursor() as IDBRequest<IDBCursorWithValue | null>;
        }
        return new Cursor(request, query);
    }

    // deleteMany<T> (filter: FilterQuery<T>, options?: CommonOptions): Promise<DeleteWriteOpResultObject> {
    //
    // }

}