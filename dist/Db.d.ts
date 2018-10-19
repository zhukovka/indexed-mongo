import { Collection, CollectionCreateOptions } from "./Collection";
export interface IDb {
    createCollection<T>(name: string, options?: CollectionCreateOptions): Promise<Collection<T>>;
    collection<T>(name: string): Collection<T>;
}
export declare class Db implements IDb {
    private idb;
    private collectionQueue;
    private DBOpenRequest;
    static open(name: string, collections?: string[]): Promise<Db>;
    constructor(idb: IDBDatabase);
    readonly version: number;
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
    createCollection<T>(name: string, options?: IDBObjectStoreParameters): Promise<Collection<T>>;
    collection<T>(name: string): Collection<T>;
    close(): void;
}
