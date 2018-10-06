export declare class Cursor<T> {
    private request;
    constructor(request: IDBRequest);
    toArray(): Promise<T[]>;
}
