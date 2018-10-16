import { FilterQuery } from "./Collection";
export declare enum CursorOperation {
    DELETE = 0,
    UPDATE = 1,
    READ = 2
}
export declare class Cursor<T extends {
    [key: string]: any;
}> {
    private request;
    private result;
    private _result;
    constructor(request: IDBRequest, filter?: FilterQuery<T>, operation?: CursorOperation);
    private applyFilter;
    private executeCursorOperation;
    toArray(): Promise<T[]>;
}
