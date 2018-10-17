import { Cursor } from "./Cursor";
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
export declare type FilterQuery<T> = {
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
} | {
    [key: string]: any;
};
interface CommonOptions {
}
export interface DeleteWriteOpResultObject {
    result: {
        ok?: number;
        n?: number;
    };
    deletedCount?: number;
}
export interface ICollection<T> {
    /**
     *
     * @param docs
     * @param options
     */
    insertOne(docs: Object, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>;
    insertMany(docs: Object[], options?: CollectionInsertOneOptions): Promise<InsertWriteOpResult>;
    /**
     *
     * @param query[optional]
     * The find() method with no parameters returns all documents from a collection and returns all fields for the documents.
     */
    find(query?: FilterQuery<T>): Cursor<T>;
    deleteMany(filter: FilterQuery<T>, options?: CommonOptions): Promise<DeleteWriteOpResultObject>;
    deleteOne(filter: FilterQuery<T>, options?: CommonOptions): Promise<DeleteWriteOpResultObject>;
}
export declare class Collection<T extends {
    [key: string]: any;
}> implements ICollection<T> {
    private store;
    private idb;
    constructor(store: IDBObjectStore, idb: IDBDatabase);
    /**
     *
     * @param docs
     * @param options
     */
    insertOne(docs: Object, options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>;
    insertMany(docs: Object[], options?: CollectionInsertOneOptions): Promise<InsertWriteOpResult>;
    private getCursor;
    /**
     *
     * @param query[optional]
     * The find() method with no parameters returns all documents from a collection and returns all fields for the documents.
     */
    find(query?: FilterQuery<T>): Cursor<T>;
    private delete;
    deleteMany(filter: FilterQuery<T>, options?: CommonOptions): Promise<DeleteWriteOpResultObject>;
    deleteOne(filter: FilterQuery<T>, options?: CommonOptions): Promise<DeleteWriteOpResultObject>;
}
export {};
