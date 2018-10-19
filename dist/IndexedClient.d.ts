import { IDb } from "./Db";
export interface IndexedClientOptions {
    collections?: string[];
}
export interface IndexedMongoClientOptions {
}
export interface IndexedMongoClientStatic {
    connect(uri: string, options?: IndexedMongoClientOptions): Promise<IndexedMongoClient>;
}
export interface IndexedMongoClient {
    db(dbname: string): IDb;
    close(force?: boolean): Promise<void>;
}
export declare const IndexedClient: IndexedMongoClientStatic;
