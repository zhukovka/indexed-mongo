import { Collection } from "./Collection";
export declare class Db {
    private idb;
    private collectionQueue;
    private DBOpenRequest;
    static open(name: string): Promise<Db>;
    constructor(idb: IDBDatabase);
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
    createCollection(name: string, options?: IDBObjectStoreParameters): Promise<Collection>;
    collection(name: string): Promise<Collection>;
}
