"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cursor {
    constructor(request) {
        this.request = request;
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
    toArray() {
        return new Promise((resolve, reject) => {
            this.request.onerror = reject;
            this.request.onsuccess = (event) => {
                // Do something with the request.result!
                resolve(this.request.result);
            };
        });
    }
}
exports.Cursor = Cursor;
//# sourceMappingURL=Cursor.js.map