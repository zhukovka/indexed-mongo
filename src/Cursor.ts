import {FilterQuery} from "./Collection";

export enum CursorOperation {
    DELETE, UPDATE, READ
}

export interface ICursor<T> {
    toArray (): Promise<T[]>
}

//[P in keyof T]?: T[P]
export class Cursor<T extends { [key: string]: any }> implements ICursor<T> {
    private result: Promise<T[]>;
    private _result: T[];

    constructor (private request: IDBRequest, filter?: FilterQuery<T>, operation: CursorOperation = CursorOperation.READ) {
        this.result = new Promise((resolve, reject) => {

            this.request.onerror = e => {
                reject(this.request.error);
            };
            this.request.onsuccess = (event) => {
                // Do something with the request.result!
                const cursor = request.result;
                if (cursor && cursor instanceof IDBCursorWithValue) {
                    this._result = this._result || [];
                    // cursor.value contains the current record being iterated through
                    // this is where you'd do something with the result
                    this.executeCursorOperation(operation, cursor, filter);
                    cursor.continue();
                    return;
                } else {
                    this._result = this._result || this.request.result;
                }
                resolve(this._result);
            };

        });


    }

    private applyFilter (value: T, filter: FilterQuery<T>) {
        let filterKeys = Object.keys(filter);

        for (const key of filterKeys) {
            if (key.startsWith('$')) {
                //TODO: operators
                return;
            }
            if (value[key] != filter[key]) {
                return;
            }
        }
        return value;

    }

    private executeCursorOperation (operation: CursorOperation, cursor: IDBCursorWithValue, filter?: FilterQuery<T>) {
        const value = filter ? this.applyFilter(cursor.value, filter) : cursor.value;
        if (!value) {
            return;
        }
        this._result.push(value);
        switch (operation) {
            case CursorOperation.DELETE:
                cursor.delete();
                break;
            case CursorOperation.UPDATE:
                //TODO: Update
                // ??? cursor.update();
                break;
        }
    }

    getResult (): Promise<T[]> {
        return this.result;
    }


// sortValue: string;
    // timeout: boolean;
    // readPreference: ReadPreference;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#addCursorFlag */
    // addCursorFlag(flag: string, value: boolean): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#addQueryModifier */
    // addQueryModifier(name: string, value: boolean): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#batchSize */
    // batchSize(value: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#clone */
    // clone(): Cursor<T>; // still returns the same type
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#close */
    // close(): Promise<CursorResult>;
    // close(callback: MongoCallback<CursorResult>): void;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#collation */
    // collation(value: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#comment */
    // comment(value: string): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#count */
    // count(callback: MongoCallback<number>): void;
    // count(applySkipLimit: boolean, callback: MongoCallback<number>): void;
    // count(options: CursorCommentOptions, callback: MongoCallback<number>): void;
    // count(applySkipLimit: boolean, options: CursorCommentOptions, callback: MongoCallback<number>): void;
    // count(applySkipLimit?: boolean, options?: CursorCommentOptions): Promise<number>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#explain */
    // explain(): Promise<CursorResult>;
    // explain(callback: MongoCallback<CursorResult>): void;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#filter */
    // filter(filter: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#forEach */
    // forEach(iterator: IteratorCallback<T>, callback: EndCallback): void;
    // forEach(iterator: IteratorCallback<T>): Promise<void>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#hasNext */
    // hasNext(): Promise<boolean>;
    // hasNext(callback: MongoCallback<boolean>): void;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#hint */
    // hint(hint: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#isClosed */
    // isClosed(): boolean;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#limit */
    // limit(value: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#map */
    // map<U>(transform: (document: T) => U): Cursor<U>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#max */
    // max(max: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#maxAwaitTimeMS */
    // maxAwaitTimeMS(value: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#maxScan */
    // maxScan(maxScan: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#maxTimeMS */
    // maxTimeMS(value: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#min */
    // min(min: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#next */
    // next(): Promise<T | null>;
    // next(callback: MongoCallback<T | null>): void;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#project */
    // project(value: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#read */
    // read(size: number): string | Buffer | void;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#next */
    // returnKey(returnKey: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#rewind */
    // rewind(): void;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#setCursorOption */
    // setCursorOption(field: string, value: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#setReadPreference */
    // setReadPreference(readPreference: string | ReadPreference): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#showRecordId */
    // showRecordId(showRecordId: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#skip */
    // skip(value: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#snapshot */
    // snapshot(snapshot: Object): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#sort */
    // sort(keyOrList: string | Object[] | Object, direction?: number): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#stream */
    // stream(options?: { transform?: Function }): Cursor<T>;
    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#toArray */
    toArray (): Promise<T[]> {
        return this.result.then(result => Array.from(result) as T[]);
    }

    // /** http://mongodb.github.io/node-mongodb-native/3.1/api/Cursor.html#unshift */
    // unshift(stream: Buffer | string): void;

}