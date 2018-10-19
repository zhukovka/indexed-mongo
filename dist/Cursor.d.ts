import { FilterQuery, UpdateQuery } from "./Collection";
export declare enum CursorOperation {
    DELETE = 0,
    UPDATE = 1,
    READ = 2
}
export interface ICursor<T> {
    toArray(): Promise<T[]>;
}
export declare class Cursor<T extends {
    [key: string]: any;
}> implements ICursor<T> {
    private result;
    private _result;
    constructor(store: IDBObjectStore, filter?: FilterQuery<T>, operation?: CursorOperation, single?: boolean, update?: UpdateQuery<T> | T);
    private getRequest;
    private applyFilter;
    private executeCursorOperation;
    getResult(): Promise<T[]>;
    toArray(): Promise<T[]>;
}
